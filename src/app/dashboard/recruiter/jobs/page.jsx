import { getCompanyJobs } from "@/lib/service/api";
import React from "react";
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { FiEye, FiEdit3, FiTrash2 } from "react-icons/fi";

const JobsPage = async () => {
  const companyId = "comp_12345"; // TODO: get dynamically later
  const jobs = (await getCompanyJobs(companyId)) || [];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-4">
      {/* Header section */}
      <div className="flex flex-col gap-1 mb-4">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
          Recruiter/company Manage All Jobs
        </h2>
        <p className="text-sm text-neutral-500">
          Track, edit, or delete listings for this organization.
        </p>
      </div>

      {/* Hero UI Resizable Table */}
      <Table aria-label="Company jobs management table">
        <Table.ResizableContainer>
          <Table.Content className="min-w-[900px]">
            <Table.Header>
              <Table.Column
                isRowHeader
                defaultWidth="2fr"
                id="title"
                minWidth={200}
              >
                Job Title
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="category" minWidth={130}>
                Category
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="location" minWidth={120}>
                Location
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1.2fr" id="salary" minWidth={150}>
                Salary Range
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="status" minWidth={110}>
                Status
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1.2fr" id="actions" minWidth={140}>
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body emptyContent={"No jobs found for this company."}>
              {jobs.map((job) => {
                // MongoDB object ID parsing fallback
                const jobId = job._id?.$oid || job._id;

                return (
                  <Table.Row key={jobId}>
                    {/* Job Title & Sub-info */}
                    <Table.Cell>
                      <div className="flex flex-col">
                        <span className="font-medium text-neutral-800 dark:text-neutral-200">
                          {job.jobTitle}
                        </span>
                        <span className="text-xs text-neutral-400 capitalize">
                          {job.jobType} {job.isRemote && "(Remote)"}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Category */}
                    <Table.Cell>
                      <span className="capitalize text-neutral-600 dark:text-neutral-400">
                        {job.jobCategory}
                      </span>
                    </Table.Cell>

                    {/* Location */}
                    <Table.Cell>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {job.location}
                      </span>
                    </Table.Cell>

                    {/* Salary formatted nicely */}
                    <Table.Cell>
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {job.minSalary && job.maxSalary
                          ? `${Number(job.minSalary).toLocaleString()} - ${Number(job.maxSalary).toLocaleString()} ${job.currency}`
                          : "Negotiable"}
                      </span>
                    </Table.Cell>

                    {/* Status Chip */}
                    <Table.Cell>
                      <Chip
                        color={job.status === "active" ? "success" : "default"}
                        size="sm"
                        variant="soft"
                        className="capitalize"
                      >
                        {job.status || "Draft"}
                      </Chip>
                    </Table.Cell>

                    {/* Action Icon Buttons */}
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Tooltip content="View Details">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            aria-label="View Details"
                          >
                            <FiEye className="text-lg text-neutral-500 hover:text-primary transition-colors" />
                          </Button>
                        </Tooltip>

                        <Tooltip content="Edit Job">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            aria-label="Edit Job"
                          >
                            <FiEdit3 className="text-lg text-neutral-500 hover:text-warning transition-colors" />
                          </Button>
                        </Tooltip>

                        <Tooltip content="Delete Job" color="danger">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            aria-label="Delete Job"
                          >
                            <FiTrash2 className="text-lg text-danger" />
                          </Button>
                        </Tooltip>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
};

export default JobsPage;
