"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  GET_DEPARTMENTS,
  UPDATE_DEPARTMENT,
} from "@/graphql/mutations";
import { toast } from "react-toastify";
import { ShowError } from "@/components/ShowError";

const Departments = () => {
  const { data, loading, refetch } = useQuery(GET_DEPARTMENTS);
  const [createDepartment] = useMutation(CREATE_DEPARTMENT);
  const [updateDepartment] = useMutation(UPDATE_DEPARTMENT);
  const [deleteDepartment] = useMutation(DELETE_DEPARTMENT, {
    onCompleted: () => {
      toast.success("Department deleted successfully!");
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [subDepartments, setSubDepartments] = useState([{ name: "" }]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const departments = data?.getDepartments || [];
  const totalPages = Math.ceil(departments.length / itemsPerPage);
  const paginatedDepartments = departments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const input = {
        name,
        subDepartments: subDepartments
          .filter((s) => s.name.trim())
          .map((s) => ({
            id: (s as { name: string; id: string }).id || "",
            name: s.name.trim(),
          })),
      };

      if (editing) {
        await updateDepartment({
          variables: {
            input: {
              id: (editing as { name: string; id: string }).id,
              ...input,
            },
          },
        });
        toast.success("Department updated successfully!");
      } else {
        await createDepartment({ variables: { input } });
        toast.success("Department created successfully!");
      }

      refetch();
      setOpenDialog(false);
      setName("");
      setEditing(null);
      setSubDepartments([{ name: "" }]);
    } catch (error) {
      console.error("Error submitting form:", error);
      ShowError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (dept: any) => {
    setEditing(dept);
    setName(dept.name);
    setOpenDialog(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filledSubs = dept.subDepartments?.map((sub: any) => ({
      id: sub.id,
      name: sub.name,
    })) || [{ name: "" }];

    setSubDepartments(filledSubs);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = async (id: any) => {
    setDeletingId(id);
    try {
      await deleteDepartment({ variables: { id: id.toString() } });
      refetch();
    } catch (error) {
      console.error("Error deleting department:", error);
      ShowError(error);
    } finally {
      setDeletingId(null);
    }
  };

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubDeptChange = (index: number, value: any) => {
    const updated = [...subDepartments];
    updated[index].name = value;
    setSubDepartments(updated);
  };

  const addSubDepartment = () => {
    setSubDepartments([...subDepartments, { name: "" }]);
  };

  const removeSubDepartment = (index: number) => {
    const updated = [...subDepartments];
    updated.splice(index, 1);
    setSubDepartments(updated);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Departments</h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="transition-all duration-200 hover:brightness-95"
                onClick={() => setEditing(null)}
              >
                Create Department
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editing ? "Edit Department" : "New Department"}
                </DialogTitle>
              </DialogHeader>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Department name"
              />
              <div className="space-y-2 mt-4">
                <label className="font-medium">Sub-departments</label>
                {subDepartments.map((sub, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      value={sub.name}
                      onChange={(e) =>
                        handleSubDeptChange(index, e.target.value)
                      }
                      placeholder={`Sub-department ${index + 1}`}
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="transition-all duration-200 hover:brightness-95"
                      onClick={() => removeSubDepartment(index)}
                      disabled={isSubmitting}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  size="sm"
                  onClick={addSubDepartment}
                  disabled={isSubmitting}
                >
                  Add Sub-department
                </Button>
              </div>

              <DialogFooter>
                <Button
                  variant="ghost"
                  onClick={() => setOpenDialog(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting
                    ? editing
                      ? "Updating..."
                      : "Creating..."
                    : editing
                    ? "Update"
                    : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Sub-Departments</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            ) : paginatedDepartments.length ? (
              paginatedDepartments.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (dept: any) => (
                  <TableRow key={dept.id}>
                    <TableCell>{dept.id}</TableCell>
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

                    <TableCell className="space-x-2">
                      <Button
                        size="sm"
                        className="transition-all duration-200 hover:bg-gray-500"
                        onClick={() => handleEdit(dept)}
                        disabled={!!deletingId}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="transition-all duration-200 hover:brightness-95"
                        onClick={() => handleDelete(dept.id)}
                        disabled={!!deletingId}
                      >
                        {deletingId === dept.id ? "Deleting..." : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No departments found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}

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

export default Departments;
