"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function UserManagementTable() {
  const [addNewUserFormData, setAddNewUserFormData] = useState({
    role: "partner",
    address: "",
    contact: "",
    name: "",
    phoneNumber: "",
    email: "",
    payementMethod: "transfer",
    AccountDetails: "",
  });
  return (
    <div className="w-full flex flex-col gap-5">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-2xl md:text-3xl font-medium">User Management</h2>
        <Dialog>
          <DialogTrigger
            className="w-full md:w-[15%] bg-red-primary text-white px-2 py-3 md:px-3 md:py-4 rounded-md 
        hover:bg-red-primary/90 cursor-pointer"
          >
            Add User
          </DialogTrigger>
          <DialogContent className="w-[300px] md:w-2/3 border-0">
            <DialogHeader>
              {/* test */}
              <DialogTitle>Add New User</DialogTitle>
              {/* form */}
              <DialogDescription className="mt-4 flex flex-col gap-3">
                {/* role selector */}
                <div className="w-full flex flex-col gap-2">
                  <span className="text-black/80 text-lg">Role</span>
                  <Select
                    defaultValue={addNewUserFormData.role}
                    onValueChange={(value) =>
                      setAddNewUserFormData({
                        ...addNewUserFormData,
                        role: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-full border border-black/80 p-5 rounded-sm">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="border-black/80">
                      <SelectItem value="partner">Partner</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* address */}
                <div className="w-full flex flex-col gap-2">
                  <span className="text-black/80 text-lg">Address</span>
                  <input
                    type="email"
                    value={addNewUserFormData.address}
                    onChange={(e) => {
                      setAddNewUserFormData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }));
                    }}
                    className="focus:outline-none border-black/80 border rounded-sm px-2 py-3 shadow-none"
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </header>
    </div>
  );
}

export default UserManagementTable;
