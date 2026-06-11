"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  Select,
  ListBox,
  TextArea,
  Button,
} from "@heroui/react";
import {
  FiGlobe,
  FiMapPin,
  FiLayers,
  FiUsers,
  FiUploadCloud,
  FiEdit3,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiTrendingUp,
} from "react-icons/fi";
import { createCompany } from "@/lib/actions/companies";
import { toast } from "sonner";

const CompanyPage = () => {
  // Set to null initially to showcase the "No Company Registered" empty state layout.
  // Switch this to a data object once connected to your MongoDB backend pipeline.
  const [company, setCompany] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [industry, setIndustry] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [errors, setErrors] = useState({});

  // Client-side ImgBB Cloud Upload Handling
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoPreview(URL.createObjectURL(file));
    setUploadingLogo(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API_KEY;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();

      if (data.success) {
        setLogoPreview(data.data.url);
      } else {
        alert("ImgBB Cloud Upload Failed.");
      }
    } catch (err) {
      console.error("Error during logo upload:", err);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      name: companyName.trim(),
      websiteUrl: websiteUrl.trim(),
      industry,
      location: location.trim(),
      employeeCount,
      logoUrl: logoPreview,
      description: description.trim(),
      status: company?.status || "Pending",
    };

    // Form Fields Validation
    let validationErrors = {};
    if (!updatedData.name)
      validationErrors.companyName = "Company name is required";
    if (!updatedData.industry)
      validationErrors.industry = "Please select an industry";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setCompany(updatedData);
    setIsEditing(false);

    console.log("Saving corporate configuration to MongoDB:", updatedData);

    const payload = await createCompany(updatedData);
    if (payload.insertedId) {
      toast.success("Company profile created successfully!");
    }
  };

  // Status Badge Component Helper
  const renderStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm shadow-emerald-500/5">
            <FiCheckCircle className="text-emerald-400 w-3.5 h-3.5" /> Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm shadow-rose-500/5">
            <FiXCircle className="text-rose-400 w-3.5 h-3.5" /> Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/5">
            <FiClock className="text-amber-400 w-3.5 h-3.5" /> Pending Review
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] p-4 md:p-12 flex items-center justify-center">
      {/* 1. UNREGISTERED STATE (Empty Slate View) */}
      {!company && !isEditing && (
        <div className="w-full max-w-lg p-10 rounded-2xl bg-[#111113] border border-[#1f1f23] text-center space-y-6 shadow-2xl transition-all duration-300">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#18181b] flex items-center justify-center border border-[#2d2d31] shadow-inner">
            <FiBriefcase className="text-zinc-400 w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight text-zinc-100">
              Setup Business Profile
            </h3>
            <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
              To access the recruiter workspace, you must first register and
              validate your company details.
            </p>
          </div>
          <div className="pt-2">
            <Button
              onClick={() => {
                setIndustry("");
                setEmployeeCount("");
                setLogoPreview("");
                setCompanyName("");
                setWebsiteUrl("");
                setLocation("");
                setDescription("");
                setIsEditing(true);
              }}
              className="w-full sm:w-auto bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold text-sm px-8 rounded-xl h-11 transition shadow-lg shadow-white/5"
            >
              Register Your Company
            </Button>
          </div>
        </div>
      )}

      {/* 2. REGISTERED PROFILE VIEWER (Premium Dashboard UI/UX Look) */}
      {company && !isEditing && (
        <div className="w-full max-w-4xl bg-[#111113] border border-[#1f1f23] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
          {/* Cover Accent Header Banner */}
          <div className="h-24 bg-gradient-to-r from-[#18181c] via-[#1c1c24] to-[#141416] border-b border-[#1f1f23] relative" />

          {/* Core Layout Data Block */}
          <div className="px-6 md:px-8 pb-8 relative">
            {/* Header Identity Layout */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 -mt-10 mb-8 pb-6 border-b border-[#1e1e22]">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                {company.logoUrl ? (
                  <img
                    src={company.logoUrl}
                    alt="Company Logo"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-[#1f1f23] bg-[#1c1c1f] shadow-2xl relative z-10"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-[#1c1c1f] border-2 border-[#1f1f23] flex items-center justify-center text-zinc-400 font-extrabold text-2xl uppercase shadow-2xl relative z-10">
                    {company.name.charAt(0)}
                  </div>
                )}

                <div className="space-y-1.5 pb-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-black tracking-tight text-zinc-100">
                      {company.name}
                    </h2>
                    {renderStatusBadge(company.status)}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-zinc-400">
                    <span className="flex items-center gap-1 capitalize">
                      <FiLayers className="text-zinc-500" /> {company.industry}
                    </span>
                    <span className="text-zinc-600">&bull;</span>
                    <span className="flex items-center gap-1">
                      <FiUsers className="text-zinc-500" />{" "}
                      {company.employeeCount} Members
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  setIndustry(company.industry);
                  setEmployeeCount(company.employeeCount);
                  setLogoPreview(company.logoUrl);
                  setCompanyName(company.name || "");
                  setWebsiteUrl(company.websiteUrl || "");
                  setLocation(company.location || "");
                  setDescription(company.description || "");
                  setIsEditing(true);
                }}
                variant="bordered"
                className="border-[#2d2d31] hover:border-zinc-500 text-zinc-300 hover:bg-[#1c1c1f] text-xs font-bold px-5 rounded-xl h-10 gap-2 transition"
              >
                <FiEdit3 className="w-3.5 h-3.5" /> Edit Workspace Info
              </Button>
            </div>

            {/* Metrics Quick Meta Section Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-[#161619] border border-[#202024]">
                <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block mb-1">
                  Corporate Domain
                </span>
                <a
                  href={
                    company.websiteUrl.startsWith("http")
                      ? company.websiteUrl
                      : `https://${company.websiteUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-zinc-200 hover:text-white transition flex items-center gap-2 truncate"
                >
                  <FiGlobe className="text-zinc-400 shrink-0" />{" "}
                  {company.websiteUrl}
                </a>
              </div>

              <div className="p-4 rounded-xl bg-[#161619] border border-[#202024]">
                <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block mb-1">
                  Operational Location
                </span>
                <div className="text-sm font-semibold text-zinc-200 flex items-center gap-2 truncate">
                  <FiMapPin className="text-zinc-400 shrink-0" />{" "}
                  {company.location || "Global Remote Hub"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#161619] border border-[#202024]">
                <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block mb-1">
                  Talent Pipeline
                </span>
                <div className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                  <FiTrendingUp className="shrink-0" /> Active Hiring Channel
                </div>
              </div>
            </div>

            {/* Corporate Profile Description Card */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Corporate Identity & Mission
              </h4>
              <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line bg-[#151518] p-5 rounded-xl border border-[#1e1e22]">
                {company.description ||
                  "No corporate description documented yet."}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. DYNAMIC ENTERPRISE REGISTRATION FORM VIEW */}
      {isEditing && (
        <div className="w-full max-w-3xl bg-[#111113] border border-[#1f1f23] rounded-2xl shadow-2xl">
          <Form
            onSubmit={handleSubmit}
            validationBehavior="aria"
            className="p-6 space-y-6"
          >
            <Fieldset>
              <legend className="text-sm font-bold tracking-wide uppercase text-zinc-400 border-b border-[#1f1f23] pb-2 w-full mb-6">
                {company
                  ? "Modify Corporate Profile"
                  : "Register Enterprise Credentials"}
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Company Name */}
                <TextField
                  isInvalid={!!errors.companyName}
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-zinc-300 font-medium text-xs">
                    Company Name
                  </Label>
                  <Input
                    name="companyName"
                    placeholder="e.g. Acme Digital Frameworks"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full rounded-md bg-[#1c1c1f] hover:bg-[#222226] border border-[#2d2d31] px-3 py-2 text-sm text-zinc-200 focus-visible:outline-none focus-visible:border-zinc-500 transition"
                  />
                  {errors.companyName && (
                    <span className="text-xs text-red-500 mt-0.5">
                      {errors.companyName}
                    </span>
                  )}
                </TextField>

                {/* Industry Dropdown List Selector */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-300 font-medium text-xs">
                    Industry / Category
                  </span>
                  <Select
                    placeholder="Select Market Area"
                    className="w-full"
                    selectedKey={industry}
                    onSelectionChange={(key) => setIndustry(key)}
                    classNames={{
                      trigger: `bg-[#1c1c1f] hover:bg-[#222226] border min-h-10 rounded-md px-3 text-sm text-zinc-200 transition ${
                        errors.industry ? "border-red-500" : "border-[#2d2d31]"
                      }`,
                    }}
                  >
                    <Select.Trigger>
                      <Select.Value className="text-sm text-zinc-200" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-[#1c1c1f] border border-[#2d2d31] text-zinc-200">
                      <ListBox>
                        <ListBox.Item
                          id="technology"
                          textValue="Technology & SaaS"
                        >
                          Technology & SaaS
                        </ListBox.Item>
                        <ListBox.Item
                          id="healthcare"
                          textValue="Healthcare & Biotech"
                        >
                          Healthcare & Biotech
                        </ListBox.Item>
                        <ListBox.Item
                          id="finance"
                          textValue="Finance & Fintech"
                        >
                          Finance & Fintech
                        </ListBox.Item>
                        <ListBox.Item
                          id="education"
                          textValue="E-Learning & Education"
                        >
                          E-Learning & Education
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* Corporate Website Endpoint */}
                <TextField className="flex flex-col gap-1.5">
                  <Label className="text-zinc-300 font-medium text-xs">
                    Website URL
                  </Label>
                  <div className="relative flex items-center rounded-md bg-[#1c1c1f] border border-[#2d2d31] overflow-hidden focus-within:border-zinc-500 transition">
                    <span className="bg-[#242427] text-zinc-400 px-3 py-2 text-xs font-mono select-none border-r border-[#2d2d31]">
                      https://
                    </span>
                    <Input
                      name="websiteUrl"
                      placeholder="acme.dev"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="w-full bg-transparent pl-3 pr-3 py-2 text-sm text-zinc-200 focus-visible:outline-none"
                    />
                  </div>
                </TextField>

                {/* HQ Location Input */}
                <TextField className="flex flex-col gap-1.5">
                  <Label className="text-zinc-300 font-medium text-xs">
                    Headquarters Location
                  </Label>
                  <div className="relative flex items-center">
                    <FiMapPin className="absolute left-3 text-zinc-500 w-4 h-4 z-10" />
                    <Input
                      name="location"
                      placeholder="e.g. Dhaka, Bangladesh"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full rounded-md bg-[#1c1c1f] hover:bg-[#222226] border border-[#2d2d31] pl-9 pr-3 py-2 text-sm text-zinc-200 focus-visible:outline-none focus-visible:border-zinc-500 transition"
                    />
                  </div>
                </TextField>

                {/* Team Headcount Scale Selection */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-300 font-medium text-xs">
                    Employee Capacity
                  </span>
                  <Select
                    placeholder="Select headcount size"
                    className="w-full"
                    selectedKey={employeeCount}
                    onSelectionChange={(key) => setEmployeeCount(key)}
                    classNames={{
                      trigger:
                        "bg-[#1c1c1f] hover:bg-[#222226] border border-[#2d2d31] min-h-10 rounded-md px-3 text-sm text-zinc-200 transition",
                    }}
                  >
                    <Select.Trigger>
                      <Select.Value className="text-sm text-zinc-200" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-[#1c1c1f] border border-[#2d2d31] text-zinc-200">
                      <ListBox>
                        <ListBox.Item id="1-10" textValue="1-10 Squad Members">
                          1-10 Squad Members
                        </ListBox.Item>
                        <ListBox.Item id="11-50" textValue="11-50 Core Group">
                          11-50 Core Group
                        </ListBox.Item>
                        <ListBox.Item
                          id="51-200"
                          textValue="51-200 Enterprise Scaling"
                        >
                          51-200 Enterprise Scaling
                        </ListBox.Item>
                        <ListBox.Item id="201+" textValue="201+ Global Scale">
                          201+ Global Scale
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* Logo Image Cloud File Picker */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-300 font-medium text-xs">
                    Company Branding Logo
                  </span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#1c1c1f] hover:bg-[#222226] border border-[#2d2d31] border-dashed cursor-pointer transition relative group overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover group-hover:opacity-40"
                        />
                      ) : (
                        <FiUploadCloud className="text-zinc-400 w-4 h-4" />
                      )}
                    </label>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-zinc-300">
                        {uploadingLogo
                          ? "Syncing with cloud..."
                          : "Upload square file"}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        PNG or JPG optimized scale
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Summary Description Block */}
              <div className="mt-5">
                <TextField className="flex flex-col gap-1.5">
                  <Label className="text-zinc-300 font-medium text-xs">
                    Company Description
                  </Label>
                  <TextArea
                    name="description"
                    rows={4}
                    placeholder="Provide deep details about operations, mission targets, and infrastructure updates..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-md bg-[#1c1c1f] hover:bg-[#222226] border border-[#2d2d31] p-3 text-sm text-zinc-200 focus-visible:outline-none focus-visible:border-zinc-500 transition resize-none min-h-[100px]"
                  />
                </TextField>
              </div>
            </Fieldset>

            {/* Bottom Form Actions Control Triggers Row */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1f1f23]">
              {company && (
                <Button
                  type="button"
                  variant="bordered"
                  onClick={() => setIsEditing(false)}
                  className="border-[#2d2d31] text-zinc-300 hover:bg-[#1c1c1f] text-xs font-medium px-5 rounded-md h-9"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold text-xs px-6 rounded-md h-9 transition shadow-sm"
              >
                {company ? "Save Custom Workspace" : "Complete Registration"}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
