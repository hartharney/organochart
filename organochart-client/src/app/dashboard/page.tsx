"use client";

import { useQuery } from "@apollo/client";
import { GET_DEPARTMENTS } from "@/graphql/mutations";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import React from "react";

const Dashboard = () => {
  const { data, loading, error } = useQuery(GET_DEPARTMENTS);
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 7;

  const departments = data?.getDepartments || [];

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedDepartments = departments.slice(startIndex, endIndex);

  const totalPages = Math.ceil(departments.length / rowsPerPage);

  const totalDepartments = departments.length;
  const totalSubDepartments = departments.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: any, dept: any) => sum + (dept.subDepartments?.length || 0),
    0
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <DashboardLayout>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">{totalDepartments}</h2>
            <CardDescription>
              Number of departments in your organization
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">—</h2>
            <CardDescription>
              Members data not available in current query
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Sub-Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">{totalSubDepartments}</h2>
            <CardDescription>Total active sub-departments</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Departments Table */}
      <div className="w-full overflow-hidden bg-white shadow-lg rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department Name</TableHead>
              <TableHead>Sub-Departments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDepartments.map(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (dept: any) => (
                <TableRow key={dept.id}>
                  <TableCell>{dept.name}</TableCell>
                  <TableCell>
                    {dept.subDepartments?.length ? (
                      <div className="flex flex-wrap gap-2 max-w-[400px]">
                        {dept.subDepartments.map(
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (sub: any) => (
                            <span
                              key={sub.id || sub.name}
                              className="text-sm bg-muted text-muted-foreground px-2 py-1 rounded-full whitespace-nowrap"
                            >
                              {sub.name}
                            </span>
                          )
                        )}
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center px-4 py-3">
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <div className="space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm rounded-md border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm rounded-md border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
