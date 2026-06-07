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
  FieldError,
  Button,
  Switch,
} from "@heroui/react";
import {
  FiBriefcase,
  FiDollarSign,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";
// Sonner import করা হয়েছে
import { toast } from "sonner";
import { createJob } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";

export default function PostJobPage() {
  // Mock auto-filled company data for the recruiter
  const currentCompany = {
    id: "comp_12345",
    name: "NovaStream Architecture",
    isApproved: true,
  };

  const [isRemote, setIsRemote] = useState(false);
  const [errors, setErrors] = useState({});

  // Dropdown values managed through explicit component state keys
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Basic Validation Engine
    const newErrors = {};
    if (!data.jobTitle?.trim()) newErrors.jobTitle = "Job title is required.";
    if (!category) newErrors.jobCategory = "Please select a category.";
    if (!jobType) newErrors.jobType = "Please select a job type.";
    if (!isRemote && !data.location?.trim())
      newErrors.location = "Location is required for non-remote jobs.";
    if (!data.description?.trim())
      newErrors.description = "Job description is required.";

    // Sync visual errors to state fields
    setErrors(newErrors);

    // FIXME: যদি কোনো এরর থাকে, তবে সাবমিশন থামিয়ে টোস্ট দেখাবে
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill in all the required fields!", {
        description: "Check the missing input indicators below.",
        position: "top-right",
      });
      return; // এখানেই এক্সিকিউশন শেষ হবে, নিচে যাবে না
    }

    // Payload formatting for Database transmission
    const payload = {
      ...data,
      jobCategory: category,
      jobType: jobType,
      currency: currency,
      isRemote,
      companyId: currentCompany.id,
      status: "active",
      createdAt: new Date().toISOString(),
    };



    const res = await createJob(payload);
    if (res.insertedId) {
      // 🟢 SUCCESS TOAST: ডেটা সফলভাবে পাস হলে
      toast.success("Job listed successfully!", {
        description: `${data.jobTitle} has been published.`,
      });
      e.target.reset();
      setIsRemote(false);
      redirect ("/dashboard/recruiter")
    }
    // এখানে আপনার API বা Database-এ পাঠানোর লজিক লিখতে পারেন
  };

  if (!currentCompany.isApproved) {
    return (
      <div className="flex h-[60vh] items-center justify-center p-6">
        <div className="max-w-md text-center bg-[#18181b] border border-[#27272a] rounded-xl p-6">
          <p className="text-zinc-400">
            Your company profile ({currentCompany.name}) is currently pending
            approval. You will be able to post jobs once verified.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-3xl bg-[#121214] border border-[#1f1f23] rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-[#1f1f23]">
          <h1 className="text-xl font-semibold text-zinc-100">
            Post a New Job
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Fill out the position details below. This job will be posted on
            behalf of{" "}
            <span className="text-zinc-200 font-medium">
              {currentCompany.name}
            </span>
            .
          </p>
        </div>

        {/* Form Component */}
        <Form
          onSubmit={handleSubmit}
          validationBehavior="aria"
          className="p-6 space-y-8"
        >
          {/* SECTION 1: Job Info */}
          <Fieldset
            legend="Job Info"
            classNames={{
              legend:
                "text-sm font-semibold tracking-wide uppercase text-zinc-400 border-b border-[#1f1f23] pb-2 w-full mb-4",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Title */}
              <TextField
                isInvalid={!!errors.jobTitle}
                className="flex flex-col gap-1"
              >
                <Label className="text-zinc-300 font-medium text-xs">
                  Job Title
                </Label>
                <div className="relative flex items-center">
                  <FiBriefcase className="absolute left-3 text-zinc-400 w-4 h-4 z-10" />
                  <Input
                    name="jobTitle"
                    placeholder="e.g. Senior Frontend Engineer"
                    className="w-full rounded-md bg-[#1c1c1f] hover:bg-[#222226] border border-[#2d2d31] pl-9 pr-3 py-2 text-sm text-zinc-200 focus-visible:outline-none focus-visible:border-zinc-500 transition"
                  />
                </div>
                {errors.jobTitle && (
                  <FieldError className="text-xs text-red-500 mt-0.5">
                    {errors.jobTitle}
                  </FieldError>
                )}
              </TextField>

              {/* Job Category */}
              <div className="flex flex-col gap-1">
                <span className="text-zinc-300 font-medium text-xs">
                  Job Category
                </span>
                <Select
                  placeholder="Select an industry"
                  className="w-full"
                  selectedKey={category}
                  onSelectionChange={(key) => setCategory(key)}
                  classNames={{
                    trigger: `bg-[#1c1c1f] hover:bg-[#222226] border min-h-10 rounded-md px-3 text-sm text-zinc-200 transition ${
                      errors.jobCategory ? "border-red-500" : "border-[#2d2d31]"
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
                        textValue="Technology & Software"
                      >
                        Technology & Software
                      </ListBox.Item>
                      <ListBox.Item id="design" textValue="Design & Creative">
                        Design & Creative
                      </ListBox.Item>
                      <ListBox.Item
                        id="marketing"
                        textValue="Marketing & Sales"
                      >
                        Marketing & Sales
                      </ListBox.Item>
                      <ListBox.Item
                        id="management"
                        textValue="Product Management"
                      >
                        Product Management
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
                {errors.jobCategory && (
                  <span className="text-xs text-red-500 mt-0.5">
                    {errors.jobCategory}
                  </span>
                )}
              </div>

              {/* Job Type */}
              <div className="flex flex-col gap-1">
                <span className="text-zinc-300 font-medium text-xs">
                  Job Type
                </span>
                <Select
                  placeholder="Select commitment type"
                  className="w-full"
                  selectedKey={jobType}
                  onSelectionChange={(key) => setJobType(key)}
                  classNames={{
                    trigger: `bg-[#1c1c1f] hover:bg-[#222226] border min-h-10 rounded-md px-3 text-sm text-zinc-200 transition ${
                      errors.jobType ? "border-red-500" : "border-[#2d2d31]"
                    }`,
                  }}
                >
                  <Select.Trigger>
                    <Select.Value className="text-sm text-zinc-200" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1c1c1f] border border-[#2d2d31] text-zinc-200">
                    <ListBox>
                      <ListBox.Item id="full-time" textValue="Full-time">
                        Full-time
                      </ListBox.Item>
                      <ListBox.Item id="part-time" textValue="Part-time">
                        Part-time
                      </ListBox.Item>
                      <ListBox.Item id="contract" textValue="Contract">
                        Contract
                      </ListBox.Item>
                      <ListBox.Item id="internship" textValue="Internship">
                        Internship
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
                {errors.jobType && (
                  <span className="text-xs text-red-500 mt-0.5">
                    {errors.jobType}
                  </span>
                )}
              </div>

              {/* Application Deadline */}
              <TextField className="flex flex-col gap-1">
                <Label className="text-zinc-300 font-medium text-xs">
                  Application Deadline
                </Label>
                <div className="relative flex items-center">
                  <FiCalendar className="absolute left-3 text-zinc-400 w-4 h-4 z-10" />
                  <Input
                    type="date"
                    name="deadline"
                    className="w-full rounded-md bg-[#1c1c1f] hover:bg-[#222226] border border-[#2d2d31] pl-9 pr-3 py-2 text-sm text-zinc-200 focus-visible:outline-none focus-visible:border-zinc-500 transition"
                  />
                </div>
              </TextField>
            </div>

            {/* Salary Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <TextField className="flex flex-col gap-1">
                <Label className="text-zinc-300 font-medium text-xs">
                  Minimum Salary
                </Label>
                <div className="relative flex items-center">
                  <FiDollarSign className="absolute left-3 text-zinc-500 w-3.5 h-3.5 z-10" />
                  <Input
                    type="number"
                    name="minSalary"
                    placeholder="0"
                    className="w-full rounded-md bg-[#1c1c1f] hover:bg-[#222226] border border-[#2d2d31] pl-8 pr-3 py-2 text-sm text-zinc-200 focus-visible:outline-none focus-visible:border-zinc-500 transition"
                  />
                </div>
              </TextField>

              <TextField className="flex flex-col gap-1">
                <Label className="text-zinc-300 font-medium text-xs">
                  Maximum Salary
                </Label>
                <div className="relative flex items-center">
                  <FiDollarSign className="absolute left-3 text-zinc-500 w-3.5 h-3.5 z-10" />
                  <Input
                    type="number"
                    name="maxSalary"
                    placeholder="0"
                    className="w-full rounded-md bg-[#1c1c1f] hover:bg-[#222226] border border-[#2d2d31] pl-8 pr-3 py-2 text-sm text-zinc-200 focus-visible:outline-none focus-visible:border-zinc-500 transition"
                  />
                </div>
              </TextField>

              <div className="flex flex-col gap-1">
                <span className="text-zinc-300 font-medium text-xs">
                  Currency
                </span>
                <Select
                  className="w-full"
                  selectedKey={currency}
                  onSelectionChange={(key) => setCurrency(key)}
                  classNames={{
                    trigger:
                      "bg-[#1c1c1f] hover:bg-[#222226] border border-[#2d2d31] min-h-10 rounded-md px-3 text-sm text-zinc-200",
                  }}
                >
                  <Select.Trigger>
                    <Select.Value className="text-sm text-zinc-200" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1c1c1f] border border-[#2d2d31] text-zinc-200">
                    <ListBox>
                      <ListBox.Item id="USD" textValue="USD ($)">
                        USD ($)
                      </ListBox.Item>
                      <ListBox.Item id="BDT" textValue="BDT (৳)">
                        BDT (৳)
                      </ListBox.Item>
                      <ListBox.Item id="EUR" textValue="EUR (€)">
                        EUR (€)
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* Remote vs Location Control */}
            <div className="mt-6 p-4 bg-[#18181b] rounded-lg border border-[#27272a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Switch
                isSelected={isRemote}
                onChange={setIsRemote}
                className="flex items-center gap-3"
              >
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                <Switch.Content>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      Remote Position
                    </p>
                    <p className="text-xs text-zinc-400">
                      Candidates can work from anywhere globally
                    </p>
                  </div>
                </Switch.Content>
              </Switch>

              <div className="w-full sm:w-72">
                <TextField
                  isInvalid={!isRemote && !!errors.location}
                  className="flex flex-col gap-1"
                >
                  <Label
                    className={`text-zinc-300 font-medium text-xs transition-opacity duration-200 ${isRemote ? "opacity-40" : ""}`}
                  >
                    Office Location
                  </Label>
                  <div className="relative flex items-center">
                    <FiMapPin className="absolute left-3 text-zinc-400 w-4 h-4 z-10" />
                    <Input
                      name="location"
                      placeholder="e.g. Dhaka, Bangladesh"
                      disabled={isRemote}
                      className={`w-full rounded-md bg-[#1c1c1f] hover:bg-[#222226] border border-[#2d2d31] pl-9 pr-3 py-2 text-sm text-zinc-200 focus-visible:outline-none focus-visible:border-zinc-500 transition-all duration-200 ${isRemote ? "opacity-30 cursor-not-allowed pointer-events-none" : ""}`}
                    />
                  </div>
                  {!isRemote && errors.location && (
                    <FieldError className="text-xs text-red-500 mt-0.5">
                      {errors.location}
                    </FieldError>
                  )}
                </TextField>
              </div>
            </div>
          </Fieldset>

          {/* SECTION 2: Job Description */}
          <Fieldset
            legend="Job Description Details"
            classNames={{
              legend:
                "text-sm font-semibold tracking-wide uppercase text-zinc-400 border-b border-[#1f1f23] pb-2 w-full mb-4",
            }}
          >
            <div className="space-y-5">
              <TextField
                isInvalid={!!errors.description}
                className="flex flex-col gap-1"
              >
                <Label className="text-zinc-300 font-medium text-xs">
                  Role Summary & Responsibilities
                </Label>
                <TextArea
                  name="description"
                  rows={4}
                  placeholder="Outline core daily operations, project scale, and what success looks like in this position..."
                  className="w-full rounded-md bg-[#1c1c1f] hover:bg-[#222226] border border-[#2d2d31] p-3 text-sm text-zinc-200 focus-visible:outline-none focus-visible:border-zinc-500 transition resize-y min-h-[100px]"
                />
                {errors.description && (
                  <FieldError className="text-xs text-red-500 mt-0.5">
                    {errors.description}
                  </FieldError>
                )}
              </TextField>

              <TextField className="flex flex-col gap-1">
                <Label className="text-zinc-300 font-medium text-xs">
                  Requirements & Qualifications
                </Label>
                <TextArea
                  name="requirements"
                  rows={4}
                  placeholder="List required technical skillsets, frameworks, and past professional milestones..."
                  className="w-full rounded-md bg-[#1c1c1f] hover:bg-[#222226] border border-[#2d2d31] p-3 text-sm text-zinc-200 focus-visible:outline-none focus-visible:border-zinc-500 transition resize-y min-h-[100px]"
                />
              </TextField>

              <TextField className="flex flex-col gap-1">
                <Label className="text-zinc-300 font-medium text-xs">
                  Perks & Benefits (Optional)
                </Label>
                <TextArea
                  name="benefits"
                  rows={3}
                  placeholder="e.g. Health insurance, flexible hours, annual bonuses, equipment allowances..."
                  className="w-full rounded-md bg-[#1c1c1f] hover:bg-[#222226] border border-[#2d2d31] p-3 text-sm text-zinc-200 focus-visible:outline-none focus-visible:border-zinc-500 transition resize-y min-h-[80px]"
                />
              </TextField>
            </div>
          </Fieldset>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1f1f23]">
            <Button
              type="button"
              variant="bordered"
              className="border-[#2d2d31] text-zinc-300 hover:bg-[#1c1c1f] text-xs font-medium px-5 rounded-md h-9"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-xs px-5 rounded-md h-9"
            >
              Publish Job Listing
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
