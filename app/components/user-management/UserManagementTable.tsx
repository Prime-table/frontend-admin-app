"use client";
import { useState, useRef, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { X, Trash2 } from "lucide-react";
import { RiArrowDownSFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";
import { userData } from "@/app/dummyData/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Users } from "@/app/types/types";
import {
  fetchUsers,
  addUser,
  deleteUser,
  bulkUserDelete,
} from "@/app/services/users";

function UserManagementTable() {
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [data, setData] = useState<Users[]>([]);
  const [filteredData, setFilteredData] = useState<Users[]>(data || []);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [openStatusFilter, setOpenStatusFilter] = useState(false);
  const [openDateFilter, setOpenDateFilter] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [bulkDeleteConfirmOpen, setBulkDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<Users | null>(null);
  const [editUserModal, setEditUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<Users | null>(null);
  const [editUserFormData, setEditUserFormData] = useState({
    fullName: "",
    email: "",
    role: "partner",
    status: "pending",
  });
  const [editErrors, setEditErrors] = useState({
    fullName: "",
    email: "",
    role: "",
    status: "",
  });
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const [addNewUserFormData, setAddNewUserFormData] = useState({
    role: "partner",
    address: "",
    contact: "",
    name: "",
    phoneNumber: "",
    email: "",
    paymentMethod: "transfer",
    accountNumber: "",
  });
  const [errors, setErrors] = useState({
    role: "",
    address: "",
    contact: "",
    name: "",
    phoneNumber: "",
    email: "",
    paymentMethod: "",
    accountNumber: "",
  });
  const fetchUsersAsync = async () => {
    setLoading(true);
    try {
      const users = await fetchUsers();
      setData(users);
      setFilteredData(users);
    } catch (error) {
      console.error("Backend not reachable, using fallback data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsersAsync();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const validateForm = () => {
    const newErrors = {
      role: "",
      address: "",
      contact: "",
      name: "",
      phoneNumber: "",
      email: "",
      paymentMethod: "",
      accountNumber: "",
    };
    let isValid = true;

    if (!addNewUserFormData.role) {
      newErrors.role = "Role is required";
      isValid = false;
    }
    if (!addNewUserFormData.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }
    if (!addNewUserFormData.contact) {
      newErrors.contact = "Contact is required";
      isValid = false;
    }
    if (!addNewUserFormData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!addNewUserFormData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    }
    if (!addNewUserFormData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!addNewUserFormData.paymentMethod) {
      newErrors.paymentMethod = "Payment method is required";
      isValid = false;
    }
    if (!addNewUserFormData.accountNumber) {
      newErrors.accountNumber = "Account number is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleChangeValue = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddNewUserFormData({
      ...addNewUserFormData,
      [name]: event.target.value,
    });
    if (errors) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };
  const handleSubmitForm = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newUser = await addUser({
        fullName: addNewUserFormData.name,
        email: addNewUserFormData.email,
        role: addNewUserFormData.role,
        status: "pending",
      });

      setData((prev) => prev && [...prev, newUser]);

      setAddNewUserFormData({
        role: "partner",
        address: "",
        contact: "",
        name: "",
        phoneNumber: "",
        email: "",
        paymentMethod: "transfer",
        accountNumber: "",
      });
      setErrors({
        role: "",
        address: "",
        contact: "",
        name: "",
        phoneNumber: "",
        email: "",
        paymentMethod: "",
        accountNumber: "",
      });

      toast.success("✅ User added successfully!");
      setOpenAddUserModal(false);
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("❌ Failed to add user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseForm = () => {
    setAddNewUserFormData({
      role: "partner",
      address: "",
      contact: "",
      name: "",
      phoneNumber: "",
      email: "",
      paymentMethod: "transfer",
      accountNumber: "",
    });
    setErrors({
      role: "",
      address: "",
      contact: "",
      name: "",
      phoneNumber: "",
      email: "",
      paymentMethod: "",
      accountNumber: "",
    });
    setOpenAddUserModal(false);
  };

  const [activeTab, setActiveTab] = useState("all");

  // Checkbox functionality
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedUsers(filteredData.map((user) => user.email));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userEmail: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, userEmail]);
    } else {
      setSelectedUsers((prev) => prev.filter((email) => email !== userEmail));
      setSelectAll(false);
    }
  };

  const handleDeleteUser = (user: Users) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete._id);

      await fetchUsersAsync();
      // Remove from userData array
      // const updatedUserData = userData.filter(
      //   (user) => user.email !== userToDelete.email
      // );

      // Update the userData array
      // userData.splice(0, userData.length, ...updatedUserData);
      // setData([...updatedUserData]);

      // Remove from selected users if it was selected
      setSelectedUsers((prev) =>
        prev.filter((email) => email !== userToDelete.email)
      );

      toast.success(
        `${userToDelete.fullName} has been deleted from the system`
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    } finally {
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setUserToDelete(null);
  };

  const handleBulkDelete = () => {
    if (selectedUsers.length > 0) {
      setBulkDeleteConfirmOpen(true);
    }
  };

  const confirmBulkDelete = async () => {
    if (selectedUsers.length === 0) return;

    try {
      await bulkUserDelete(selectedUsers);
      await fetchUsersAsync();
      // const updatedUserData = userData.filter(
      //   (user) => !selectedUsers.includes(user.email)
      // );

      // userData.splice(0, userData.length, ...updatedUserData);
      // setData([...updatedUserData]);

      setSelectedUsers([]);
      setSelectAll(false);

      toast.success(
        `${selectedUsers.length} user(s) have been deleted from the system`
      );
    } catch (error) {
      console.error("Error bulk deleting users:", error);
      toast.error("Failed to delete selected users.");
    } finally {
      setBulkDeleteConfirmOpen(false);
    }
  };

  const cancelBulkDelete = () => {
    setBulkDeleteConfirmOpen(false);
  };

  // Edit user functionality
  const handleEditUser = (user: Users) => {
    setUserToEdit(user);
    setEditUserFormData({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setEditUserModal(true);
  };

  const handleEditFormChange = (field: string, value: string) => {
    setEditUserFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    if (editErrors[field as keyof typeof editErrors]) {
      setEditErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateEditForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      role: "",
      status: "",
    };
    let isValid = true;

    if (!editUserFormData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }
    if (!editUserFormData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(editUserFormData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!editUserFormData.role) {
      newErrors.role = "Role is required";
      isValid = false;
    }
    if (!editUserFormData.status) {
      newErrors.status = "Status is required";
      isValid = false;
    }

    setEditErrors(newErrors);
    return isValid;
  };

  const handleUpdateUser = async () => {
    if (!validateEditForm() || !userToEdit) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // await fetch("http://localhost:5000/prime-table-admin/users/:id", {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ emails: selectedUsers }),
      // });

      // const userIndex = userData.findIndex((u) => u.email === userToEdit.email);
      // if (userIndex !== -1) {
      //   userData[userIndex] = {
      //     ...userData[userIndex],
      //     fullName: editUserFormData.fullName,
      //     email: editUserFormData.email,
      //     role: editUserFormData.role as "partner" | "customer" | "staff",
      //     status: editUserFormData.status as
      //       | "approved"
      //       | "pending"
      //       | "suspended",
      //     updatedAt: new Date().toISOString().split("T")[0],
      //   };
      //   setData([...userData]);
      // }

      toast.success(
        `${editUserFormData.fullName} has been updated successfully!`
      );
      setEditUserModal(false);
      setUserToEdit(null);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseEditModal = () => {
    setEditUserModal(false);
    setUserToEdit(null);
    setEditUserFormData({
      fullName: "",
      email: "",
      role: "partner",
      status: "pending",
    });
    setEditErrors({
      fullName: "",
      email: "",
      role: "",
      status: "",
    });
  };

  // Filter functions
  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setOpenStatusFilter(false);
  };

  const handleDateFilter = (dateRange: string) => {
    setDateFilter(dateRange);
    setOpenDateFilter(false);
  };

  const getDateRange = (range: string) => {
    const now = new Date();
    const startDate = new Date();

    switch (range) {
      case "today":
        startDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "3months":
        startDate.setMonth(now.getMonth() - 3);
        break;
      case "6months":
        startDate.setMonth(now.getMonth() - 6);
        break;
      case "year":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return null;
    }

    return { startDate, endDate: now };
  };

  const statusClass = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-orange-300";
      case "suspended":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  // Filter data based on activeTab, search, status, and date
  useEffect(() => {
    let filtered = data || [];

    // Filter by active tab (role)
    if (activeTab !== "all") {
      filtered = filtered.filter((user) => user.role === activeTab);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

    // Filter by date
    if (dateFilter !== "all") {
      const dateRange = getDateRange(dateFilter);
      if (dateRange) {
        filtered = filtered.filter((user) => {
          const userDate = new Date(user.createdAt);
          return (
            userDate >= dateRange.startDate && userDate <= dateRange.endDate
          );
        });
      }
    }

    setFilteredData(filtered);

    // Update select all state based on filtered data
    const allFilteredSelected =
      filtered.length > 0 &&
      filtered.every((user) => selectedUsers.includes(user.email));
    setSelectAll(allFilteredSelected);
  }, [activeTab, searchTerm, statusFilter, dateFilter, selectedUsers]);

  // Click outside handlers for dropdowns
  useEffect(() => {
    if (!openStatusFilter) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenStatusFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openStatusFilter]);

  useEffect(() => {
    if (!openDateFilter) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dateDropdownRef.current &&
        !dateDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDateFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDateFilter]);

  return (
    <div className="w-full flex flex-col gap-5">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-2xl md:text-3xl font-medium">User Management</h2>
        <AlertDialog open={openAddUserModal} onOpenChange={setOpenAddUserModal}>
          <AlertDialogTrigger
            className="w-full md:w-auto bg-red-primary text-white px-4 py-3 md:px-6 md:py-4 rounded-md 
        hover:bg-red-primary/90 cursor-pointer transition-colors duration-300 ease-in-out text-center"
          >
            Add User
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[95dvw] max-w-2xl max-h-[90vh] overflow-x-hidden overflow-y-auto p-0">
            <div className="p-4 md:p-6">
              <AlertDialogHeader className="">
                <AlertDialogTitle className="w-full text-xl md:text-2xl flex items-center gap-3 justify-between">
                  <span>Add New User</span>
                  <X onClick={handleCloseForm} className="ml-2 w-8 h-8" />
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm md:text-base">
                  Fill in the details below to add a new user.
                </AlertDialogDescription>
              </AlertDialogHeader>

              {/* Form Content */}
              <div className="w-full space-y-4 mt-6 overflow-x-hidden">
                {/* Role */}
                <div className="w-full flex flex-col gap-2">
                  <span className="text-black/80 text-sm md:text-base">
                    Role
                  </span>
                  <Select
                    defaultValue={addNewUserFormData.role}
                    onValueChange={(value) =>
                      setAddNewUserFormData({
                        ...addNewUserFormData,
                        role: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-full border border-black/50 p-3 md:p-4 rounded-sm">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="border-black/80">
                      <SelectItem value="partner">Partner</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <span className="text-red-500 text-xs md:text-sm">
                      {errors.role}
                    </span>
                  )}
                </div>

                {/* Address */}
                <div className="w-full flex flex-col gap-2">
                  <span className="text-black/80 text-sm md:text-base">
                    Address
                  </span>
                  <input
                    name="address"
                    type="text"
                    value={addNewUserFormData.address}
                    onChange={(e) => handleChangeValue("address", e)}
                    className="focus:outline-none border-black/50 border rounded-sm px-3 py-2 md:py-3 shadow-none text-sm md:text-base"
                  />
                  {errors.address && (
                    <span className="text-red-500 text-xs md:text-sm">
                      {errors.address}
                    </span>
                  )}
                </div>

                {/* Contact */}
                <div className="w-full flex flex-col gap-2">
                  <span className="text-black/80 text-sm md:text-base">
                    Contact
                  </span>
                  <input
                    name="contact"
                    type="text"
                    value={addNewUserFormData.contact}
                    onChange={(e) => {
                      handleChangeValue("contact", e);
                    }}
                    className="focus:outline-none border-black/50 border rounded-sm px-3 py-2 md:py-3 shadow-none text-sm md:text-base"
                  />
                  {errors.contact && (
                    <span className="text-red-500 text-xs md:text-sm">
                      {errors.contact}
                    </span>
                  )}
                </div>

                {/* Name and Phone Number */}
                <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div className="w-full flex flex-col gap-2">
                    <span className="text-black/80 text-sm md:text-base">
                      Name
                    </span>
                    <input
                      name="name"
                      type="text"
                      value={addNewUserFormData.name}
                      onChange={(e) => {
                        handleChangeValue("name", e);
                      }}
                      className="focus:outline-none border-black/50 border rounded-sm px-3 py-2 md:py-3 shadow-none text-sm md:text-base"
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs md:text-sm">
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <span className="text-black/80 text-sm md:text-base">
                      Phone Number
                    </span>
                    <input
                      name="phoneNumber"
                      type="text"
                      value={addNewUserFormData.phoneNumber}
                      onChange={(e) => {
                        handleChangeValue("phoneNumber", e);
                      }}
                      className="focus:outline-none border-black/50 border rounded-sm px-3 py-2 md:py-3 shadow-none text-sm md:text-base"
                    />
                    {errors.phoneNumber && (
                      <span className="text-red-500 text-xs md:text-sm">
                        {errors.phoneNumber}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="w-full flex flex-col gap-2">
                  <span className="text-black/80 text-sm md:text-base">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    value={addNewUserFormData.email}
                    onChange={(e) => {
                      handleChangeValue("email", e);
                    }}
                    className="focus:outline-none border-black/50 border rounded-sm px-3 py-2 md:py-3 shadow-none text-sm md:text-base"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs md:text-sm">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Payment Method */}
                <div className="w-full flex flex-col gap-2">
                  <span className="text-black/80 text-sm md:text-base">
                    Payment Method
                  </span>
                  <Select
                    defaultValue={addNewUserFormData.paymentMethod}
                    onValueChange={(value) =>
                      setAddNewUserFormData({
                        ...addNewUserFormData,
                        paymentMethod: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-full border border-black/50 p-3 md:p-4 rounded-sm">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent className="border-black/80">
                      <SelectItem value="transfer">Bank Transfer</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.paymentMethod && (
                    <span className="text-red-500 text-xs md:text-sm">
                      {errors.paymentMethod}
                    </span>
                  )}
                </div>

                {/* Account Details */}
                <div className="w-full flex flex-col gap-2">
                  <span className="text-black/80 text-sm md:text-base">
                    Account Details
                  </span>
                  <input
                    name="accountNumber"
                    type="text"
                    value={addNewUserFormData.accountNumber}
                    onChange={(e) => {
                      handleChangeValue("accountNumber", e);
                    }}
                    className="focus:outline-none border-black/50 border rounded-sm px-3 py-2 md:py-3 shadow-none text-sm md:text-base"
                  />
                  {errors.accountNumber && (
                    <span className="text-red-500 text-xs md:text-sm">
                      {errors.accountNumber}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <AlertDialogFooter className="w-full mt-6 flex flex-col-reverse md:flex-row gap-3">
                <button
                  onClick={handleCloseForm}
                  className="w-full md:w-1/2 py-2 md:py-3 px-4 md:px-6 bg-transparent border border-red-primary hover:bg-red-primary/10 
                  text-red-primary rounded-sm transition-colors duration-200 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitForm}
                  disabled={isSubmitting}
                  className="w-full md:w-1/2 py-2 md:py-3 px-4 md:px-6 bg-red-primary hover:bg-red-primary/90 
                  text-white border border-transparent rounded-sm transition-colors duration-200 ease-in-out
                  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Adding User...." : "Add User"}
                </button>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </header>

      {/* tabs */}
      <div className="w-full flex items-center relative">
        <span
          className={`cursor-pointer py-4 px-3 transition-colors text-black hover:text-red-primary
            duration-300 ease-in-out relative ${
              activeTab === "all"
                ? "text-red-primary after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-red-primary"
                : ""
            }`}
          onClick={() => setActiveTab("all")}
        >
          All
        </span>
        <span
          className={`cursor-pointer py-4 px-3 transition-colors text-black hover:text-red-primary
            duration-300 ease-in-out relative ${
              activeTab === "staff"
                ? "text-red-primary after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-red-primary"
                : ""
            }`}
          onClick={() => setActiveTab("staff")}
        >
          Staff
        </span>
        <span
          className={`cursor-pointer py-4 px-3 transition-colors text-black hover:text-red-primary
            duration-300 ease-in-out relative ${
              activeTab === "partner"
                ? "text-red-primary after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-red-primary"
                : ""
            }`}
          onClick={() => setActiveTab("partner")}
        >
          Partner
        </span>
        <span
          className={`cursor-pointer py-4 px-3 transition-colors  text-black hover:text-red-primary
            duration-300 ease-in-out relative ${
              activeTab === "customer"
                ? "text-red-primary after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-red-primary"
                : ""
            }`}
          onClick={() => setActiveTab("customer")}
        >
          Customer
        </span>
        <hr className="absolute bottom-0 left-0 right-0 text-gray-300 h-[2px]" />
      </div>

      {/* Search and Filters */}
      <div className="w-full flex flex-col lg:items-center lg:flex-row justify-between gap-4 md:gap-5">
        {/* Search Field */}
        <div className="flex-1 flex items-center justify-end">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full lg:w-2/3 mx-auto px-4 py-2 md:py-3 border border-black/30 rounded-sm 
              focus:outline-none focus:border-red-primary/50 transition-colors duration-300"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Status Filter */}
          <div
            ref={statusDropdownRef}
            className="w-full md:w-[200px] relative border border-black/30 hover:border-red-primary/50 
          duration-300 ease-in-out rounded-sm flex items-center justify-center cursor-pointer"
          >
            <div
              className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-2 md:px-6"
              onClick={() => setOpenStatusFilter(!openStatusFilter)}
            >
              <span className="flex items-center text-sm md:text-base whitespace-nowrap">
                Status: {statusFilter}
              </span>
              <span>
                <RiArrowDownSFill className="text-2xl md:text-4xl text-black/80" />
              </span>
            </div>
            <div
              className={`w-full bg-white absolute top-[110%] border border-gray-200 rounded-sm
            flex flex-col items-center justify-center gap-2 py-4 px-3 duration-300 ease-in-out ${
              openStatusFilter
                ? "max-h-[200px] opacity-100 z-[10] pointer-events-auto"
                : "max-h-0 opacity-0 z-[-1] pointer-events-none"
            }`}
            >
              <span
                onClick={() => handleStatusFilter("all")}
                className="text-sm font-semibold w-full border border-red-primary text-red-alt
              hover:bg-red-primary/10 text-center py-2 px-4 cursor-pointer rounded-sm 
              transition-colors duration-200"
              >
                All
              </span>
              <span
                onClick={() => handleStatusFilter("approved")}
                className="text-sm font-semibold w-full border border-red-primary text-red-alt
              hover:bg-red-primary/10 text-center py-2 px-4 cursor-pointer rounded-sm 
              transition-colors duration-200"
              >
                Approved
              </span>
              <span
                onClick={() => handleStatusFilter("pending")}
                className="text-sm font-semibold w-full border border-red-primary text-red-alt
              hover:bg-red-primary/10 text-center py-2 px-4 cursor-pointer rounded-sm 
              transition-colors duration-200"
              >
                Pending
              </span>
              <span
                onClick={() => handleStatusFilter("suspended")}
                className="text-sm font-semibold w-full border border-red-primary text-red-alt
              hover:bg-red-primary/10 text-center py-2 px-4 cursor-pointer rounded-sm 
              transition-colors duration-200"
              >
                Suspended
              </span>
            </div>
          </div>

          {/* Date Filter */}
          <div
            ref={dateDropdownRef}
            className="w-full md:w-[200px] relative border border-black/30 hover:border-red-primary/50 
          duration-300 ease-in-out rounded-sm flex items-center justify-center cursor-pointer"
          >
            <div
              className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-2 md:px-6"
              onClick={() => setOpenDateFilter(!openDateFilter)}
            >
              <span className="flex items-center text-sm md:text-base whitespace-nowrap">
                Date: {dateFilter === "all" ? "all time" : dateFilter}
              </span>
              <span>
                <RiArrowDownSFill className="text-2xl md:text-4xl text-black/80" />
              </span>
            </div>
            <div
              className={`w-full bg-white absolute top-[115%] border border-gray-200 rounded-sm
            flex flex-col items-center justify-center gap-2 py-4 px-3 duration-300 ease-in-out ${
              openDateFilter
                ? "max-h-[300px] opacity-100 z-[10] pointer-events-auto"
                : "max-h-0 opacity-0 z-[-1] pointer-events-none"
            }`}
            >
              <span
                onClick={() => handleDateFilter("all")}
                className="text-sm font-semibold w-full border border-red-primary text-red-alt 
              hover:bg-red-primary/10 text-center py-2 px-4 cursor-pointer rounded-sm 
              transition-colors duration-200"
              >
                All Time
              </span>
              <span
                onClick={() => handleDateFilter("today")}
                className="text-sm font-semibold w-full border border-red-primary text-red-alt 
              hover:bg-red-primary/10 text-center py-2 px-4 cursor-pointer rounded-sm 
              transition-colors duration-200"
              >
                Today
              </span>
              <span
                onClick={() => handleDateFilter("week")}
                className="text-sm font-semibold w-full border border-red-primary text-red-alt 
              hover:bg-red-primary/10 text-center py-2 px-4 cursor-pointer rounded-sm 
              transition-colors duration-200"
              >
                Last Week
              </span>
              <span
                onClick={() => handleDateFilter("month")}
                className="text-sm font-semibold w-full border border-red-primary text-red-alt 
              hover:bg-red-primary/10 text-center py-2 px-4 cursor-pointer rounded-sm 
              transition-colors duration-200"
              >
                Last Month
              </span>
              <span
                onClick={() => handleDateFilter("3months")}
                className="text-sm font-semibold w-full border border-red-primary text-red-alt 
              hover:bg-red-primary/10 text-center py-2 px-4 cursor-pointer rounded-sm 
              transition-colors duration-200"
              >
                Last 3 Months
              </span>
              <span
                onClick={() => handleDateFilter("6months")}
                className="text-sm font-semibold w-full border border-red-primary text-red-alt 
              hover:bg-red-primary/10 text-center py-2 px-4 cursor-pointer rounded-sm 
              transition-colors duration-200"
              >
                Last 6 Months
              </span>
              <span
                onClick={() => handleDateFilter("year")}
                className="text-sm font-semibold w-full border border-red-primary text-red-alt 
              hover:bg-red-primary/10 text-center py-2 px-4 cursor-pointer rounded-sm 
              transition-colors duration-200"
              >
                Last Year
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="w-full border border-gray-300 rounded-md">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="py-5 border-b-2 border-b-gray-300">
              <TableHead className="font-semibold text-black py-5">
                <Checkbox
                  className="border border-black/50 accent-red-primary"
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="font-semibold text-black py-5">
                Name
              </TableHead>
              <TableHead className="font-semibold text-black py-5">
                Email
              </TableHead>
              <TableHead className="font-semibold text-black py-5">
                Role
              </TableHead>
              <TableHead className="font-semibold text-black py-5">
                Status
              </TableHead>
              <TableHead className="font-semibold text-black py-5">
                Date Added
              </TableHead>
              <TableHead className="font-semibold text-black py-5">
                <div className="flex items-center justify-between">
                  <span>Actions</span>
                  {selectedUsers.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {selectedUsers.length} selected
                      </span>
                      <Trash2
                        onClick={handleBulkDelete}
                        className="w-5 h-5 text-red-primary hover:text-red-800 cursor-pointer transition-colors duration-200"
                      />
                    </div>
                  )}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 space-y-4 text-gray-500"
                >
                  <div className="w-10 h-10 animate-spin rounded-full border-4 border-t-transparent border-red-500 mx-auto" />
                  <span className="animate-pulse">Loading Users...</span>
                </TableCell>
              </TableRow>
            ) : filteredData.length > 0 ? (
              filteredData.map((user, index) => (
                <TableRow
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50/50"
                >
                  <TableCell className="py-3 text-black/90 font-medium">
                    <Checkbox
                      className="border border-black/50 accent-red-primary"
                      checked={selectedUsers.includes(user.email)}
                      onCheckedChange={(checked) =>
                        handleSelectUser(user.email, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="py-3 text-black/90 font-medium">
                    {user.fullName}
                  </TableCell>
                  <TableCell className="py-3 text-black/90">
                    {user.email}
                  </TableCell>
                  <TableCell className="py-3 text-black/90 capitalize">
                    {user.role}
                  </TableCell>
                  <TableCell
                    className={`py-3 font-medium capitalize ${statusClass(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </TableCell>
                  <TableCell className="py-3 text-black/90">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="py-3 flex items-center gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="hover:bg-gray-100 p-2 rounded-sm transition-colors duration-200">
                        <BsThreeDotsVertical className="text-black font-bold w-[20px] h-[20px]" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border border-gray-200 rounded-sm shadow-lg">
                        <DropdownMenuItem
                          onClick={() => handleEditUser(user)}
                          className={`cursor-pointer hover:bg-gray-50 px-3 py-2`}
                        >
                          Edit
                        </DropdownMenuItem>
                        {user.status !== "approved" && (
                          <DropdownMenuItem
                            onClick={() => {
                              const updatedData = [...filteredData];
                              const originalIndex =
                                data &&
                                data.findIndex((u) => u.email === user.email);
                              if (data && originalIndex !== -1) {
                                data[originalIndex].status = "approved";
                                setData([...data]);
                              }
                              toast.success(
                                `${user.fullName} has been approved`
                              );
                            }}
                            className="cursor-pointer hover:bg-gray-50 px-3 py-2 text-green-600"
                          >
                            Approve
                          </DropdownMenuItem>
                        )}
                        {user.status !== "suspended" && (
                          <DropdownMenuItem
                            onClick={() => {
                              const updatedData = [...filteredData];
                              const originalIndex = data.findIndex(
                                (u) => u.email === user.email
                              );
                              if (originalIndex !== -1) {
                                data[originalIndex].status = "suspended";
                                setData([...data]);
                              }
                              toast.success(
                                `${user.fullName} has been suspended`
                              );
                            }}
                            className="cursor-pointer hover:bg-gray-50 px-3 py-2 text-red-600"
                          >
                            Suspend
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Trash2
                      onClick={() => handleDeleteUser(user)}
                      className="w-[20px] h-[20px] text-red-primary hover:text-red-800 cursor-pointer transition-colors duration-200"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  No users found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent className="w-[95vw] max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-gray-900">
              Confirm Delete
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{userToDelete?.fullName}</span>?
              This action cannot be undone and will permanently remove the user
              from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse md:flex-row gap-3 mt-6">
            <button
              onClick={cancelDelete}
              className="w-full md:w-auto py-2 px-4 bg-transparent border border-gray-300 hover:bg-gray-50 
              text-gray-700 rounded-sm transition-colors duration-200 ease-in-out"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="w-full md:w-auto py-2 px-4 bg-red-primary hover:bg-red-primary/90 
              text-white border border-transparent rounded-sm transition-colors duration-200 ease-in-out"
            >
              Delete User
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Modal */}
      <AlertDialog
        open={bulkDeleteConfirmOpen}
        onOpenChange={setBulkDeleteConfirmOpen}
      >
        <AlertDialogContent className="w-[95vw] max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-gray-900">
              Confirm Bulk Delete
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {selectedUsers.length} selected user(s)
              </span>
              ? This action cannot be undone and will permanently remove these
              users from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse md:flex-row gap-3 mt-6">
            <button
              onClick={cancelBulkDelete}
              className="w-full md:w-auto py-2 px-4 bg-transparent border border-gray-300 hover:bg-gray-50 
              text-gray-700 rounded-sm transition-colors duration-200 ease-in-out"
            >
              Cancel
            </button>
            <button
              onClick={confirmBulkDelete}
              className="w-full md:w-auto py-2 px-4 bg-red-primary hover:bg-red-primary/90 
              text-white border border-transparent rounded-sm transition-colors duration-200 ease-in-out"
            >
              Delete {selectedUsers.length} User(s)
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit User Modal */}
      <AlertDialog open={editUserModal} onOpenChange={setEditUserModal}>
        <AlertDialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          <div className="p-4 md:p-6">
            <AlertDialogHeader>
              <AlertDialogTitle className="w-full text-xl md:text-2xl flex items-center gap-3 justify-between">
                <span>Edit User Details</span>
                <X
                  onClick={handleCloseEditModal}
                  className="ml-2 w-8 h-8 cursor-pointer hover:text-gray-600"
                />
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm md:text-base">
                Update the user information below.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* Edit Form Content */}
            <div className="w-full space-y-4 mt-6 overflow-x-hidden">
              {/* Full Name */}
              <div className="w-full flex flex-col gap-2">
                <span className="text-black/80 text-sm md:text-base">
                  Full Name
                </span>
                <input
                  type="text"
                  value={editUserFormData.fullName}
                  onChange={(e) =>
                    handleEditFormChange("fullName", e.target.value)
                  }
                  className="focus:outline-none border-black/50 border rounded-sm px-3 py-2 md:py-3 shadow-none text-sm md:text-base"
                  placeholder="Enter full name"
                />
                {editErrors.fullName && (
                  <span className="text-red-500 text-xs md:text-sm">
                    {editErrors.fullName}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="w-full flex flex-col gap-2">
                <span className="text-black/80 text-sm md:text-base">
                  Email
                </span>
                <input
                  type="email"
                  value={editUserFormData.email}
                  onChange={(e) =>
                    handleEditFormChange("email", e.target.value)
                  }
                  className="focus:outline-none border-black/50 border rounded-sm px-3 py-2 md:py-3 shadow-none text-sm md:text-base"
                  placeholder="Enter email address"
                />
                {editErrors.email && (
                  <span className="text-red-500 text-xs md:text-sm">
                    {editErrors.email}
                  </span>
                )}
              </div>

              {/* Role and Status */}
              <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="w-full flex flex-col gap-2">
                  <span className="text-black/80 text-sm md:text-base">
                    Role
                  </span>
                  <Select
                    value={editUserFormData.role}
                    onValueChange={(value) =>
                      handleEditFormChange("role", value)
                    }
                  >
                    <SelectTrigger className="w-full border border-black/50 p-3 md:p-4 rounded-sm">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="border-black/80">
                      <SelectItem value="partner">Partner</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                  {editErrors.role && (
                    <span className="text-red-500 text-xs md:text-sm">
                      {editErrors.role}
                    </span>
                  )}
                </div>

                <div className="w-full flex flex-col gap-2">
                  <span className="text-black/80 text-sm md:text-base">
                    Status
                  </span>
                  <Select
                    value={editUserFormData.status}
                    onValueChange={(value) =>
                      handleEditFormChange("status", value)
                    }
                  >
                    <SelectTrigger className="w-full border border-black/50 p-3 md:p-4 rounded-sm">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="border-black/80">
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  {editErrors.status && (
                    <span className="text-red-500 text-xs md:text-sm">
                      {editErrors.status}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <AlertDialogFooter className="w-full mt-6 flex flex-col-reverse md:flex-row gap-3">
              <button
                onClick={handleCloseEditModal}
                className="w-full md:w-1/2 py-2 md:py-3 px-4 md:px-6 bg-transparent border border-gray-300 hover:bg-gray-50 
                text-gray-700 rounded-sm transition-colors duration-200 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                disabled={isSubmitting}
                className="w-full md:w-1/2 py-2 md:py-3 px-4 md:px-6 bg-red-primary hover:bg-red-primary/90 
                text-white border border-transparent rounded-sm transition-colors duration-200 ease-in-out
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Updating User..." : "Update User"}
              </button>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* table */}
    </div>
  );
}

export default UserManagementTable;
