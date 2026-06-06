import React from "react";
import { Table, Chip, Link } from "@heroui/react";

export default function RecentApplications() {
  return (
    <div>
      {/* HeadeclassName=""r section with view all link */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Recent Applications
        </h2>
        <Link
          href="#"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          View all
        </Link>
      </div>

      <Table className="remove-table-styles">
        <Table.ResizableContainer>
          <Table.Content
            aria-label="Recent Applications Table"
            className="min-w-[650px]"
          >
            <Table.Header>
              <Table.Column
                isRowHeader
                defaultWidth="1.5fr"
                id="candidate"
                minWidth={180}
                className="text-zinc-500 font-medium bg-transparent border-b border-zinc-800/60 pb-3"
              >
                Candidate Name
              </Table.Column>
              <Table.Column
                defaultWidth="1.5fr"
                id="role"
                minWidth={180}
                className="text-zinc-500 font-medium bg-transparent border-b border-zinc-800/60 pb-3"
              >
                Role
              </Table.Column>
              <Table.Column
                defaultWidth="1fr"
                id="date"
                minWidth={110}
                className="text-zinc-500 font-medium bg-transparent border-b border-zinc-800/60 pb-3"
              >
                Date Applied
              </Table.Column>
              <Table.Column
                defaultWidth="1fr"
                id="experience"
                minWidth={100}
                className="text-zinc-500 font-medium bg-transparent border-b border-zinc-800/60 pb-3"
              >
                Experience
              </Table.Column>
              <Table.Column
                defaultWidth="1fr"
                id="status"
                minWidth={100}
                className="text-zinc-500 font-medium bg-transparent border-b border-zinc-800/60 pb-3"
              >
                Status
              </Table.Column>
            </Table.Header>

            <Table.Body className="divide-y divide-zinc-800/40">
              {/* Row 1 */}
              <Table.Row>
                <Table.Cell className="py-4 text-white font-semibold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-700/60 flex-shrink-0" />
                  Julianne Moore
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-400">
                  Senior Product Designer
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-400">
                  Oct 24, 2023
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-400">6 years</Table.Cell>
                <Table.Cell className="py-4">
                  <Chip
                    color="success"
                    size="sm"
                    variant="soft"
                    className="bg-emerald-950/40 text-emerald-400 border border-emerald-800/30"
                  >
                    Interviewing
                  </Chip>
                </Table.Cell>
              </Table.Row>

              {/* Row 2 */}
              <Table.Row>
                <Table.Cell className="py-4 text-white font-semibold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-700/60 flex-shrink-0" />
                  Robert Downey
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-400">
                  Backend Engineer
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-400">
                  Oct 23, 2023
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-400">4 years</Table.Cell>
                <Table.Cell className="py-4">
                  <Chip
                    color="default"
                    size="sm"
                    variant="soft"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    New
                  </Chip>
                </Table.Cell>
              </Table.Row>

              {/* Row 3 */}
              <Table.Row>
                <Table.Cell className="py-4 text-white font-semibold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-700/60 flex-shrink-0" />
                  Emma Stone
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-400">
                  Marketing Lead
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-400">
                  Oct 22, 2023
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-400">8 years</Table.Cell>
                <Table.Cell className="py-4">
                  <Chip
                    color="warning"
                    size="sm"
                    variant="soft"
                    className="bg-amber-950/40 text-amber-400 border border-amber-800/30"
                  >
                    Reviewing
                  </Chip>
                </Table.Cell>
              </Table.Row>

              {/* Row 4 */}
              <Table.Row>
                <Table.Cell className="py-4 text-white font-semibold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-700/60 flex-shrink-0" />
                  Chris Pratt
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-400">
                  Product Manager
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-400">
                  Oct 21, 2023
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-400">5 years</Table.Cell>
                <Table.Cell className="py-4">
                  <Chip
                    color="danger"
                    size="sm"
                    variant="soft"
                    className="bg-rose-950/40 text-rose-400 border border-rose-800/30"
                  >
                    Rejected
                  </Chip>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="py-4 text-white font-semibold flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-8 h-8 rounded-full bg-zinc-700/60 flex-shrink-0" />
                  Scarlett Johansson
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-400">
                  Frontend Engineer
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-400">
                  Oct 20, 2023
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-400">3 years</Table.Cell>
                <Table.Cell className="py-4">
                  <Chip
                    color="secondary"
                    size="sm"
                    variant="soft"
                    className="bg-purple-950/40 text-purple-400 border border-purple-800/30"
                  >
                    Selected
                  </Chip>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
}
