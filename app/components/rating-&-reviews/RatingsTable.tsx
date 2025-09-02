"use client";
import { useState, useRef, useEffect } from "react";
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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RiArrowDownSFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa6";
import { Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import { Reviews } from "@/app/types/types";
import { ReviewsData } from "@/app/dummyData/data";

function RatingsTable() {
  const [data, setData] = useState<Reviews[]>(ReviewsData);
  const [filteredData, setFilteredData] = useState<Reviews[]>(ReviewsData);
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [openStatusFilter, setOpenStatusFilter] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Reviews | null>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  // Checkbox functionality
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedReviews(filteredData.map((review) => review.id));
    } else {
      setSelectedReviews([]);
    }
  };

  const handleSelectReview = (reviewId: string, checked: boolean) => {
    if (checked) {
      setSelectedReviews((prev) => [...prev, reviewId]);
    } else {
      setSelectedReviews((prev) => prev.filter((id) => id !== reviewId));
      setSelectAll(false);
    }
  };

  // Filter functionality
  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setOpenStatusFilter(false);
  };

  // Action handlers
  const handleAction = (action: string, review: Reviews) => {
    const reviewIndex = ReviewsData.findIndex((r) => r.id === review.id);

    if (action === "view") {
      setSelectedReview(review);
      setViewModalOpen(true);
    } else if (action === "approve") {
      if (reviewIndex !== -1) {
        ReviewsData[reviewIndex].status = "approved";
        ReviewsData[reviewIndex].updatedAt = new Date()
          .toISOString()
          .split("T")[0];
        setData([...ReviewsData]);
      }
      toast.success(`Review ${review.id} has been approved`);
    } else if (action === "remove") {
      if (reviewIndex !== -1) {
        ReviewsData[reviewIndex].status = "removed";
        ReviewsData[reviewIndex].updatedAt = new Date()
          .toISOString()
          .split("T")[0];
        setData([...ReviewsData]);
      }
      toast.success(`Review ${review.id} has been removed`);
    } else if (action === "restore") {
      if (reviewIndex !== -1) {
        ReviewsData[reviewIndex].status = "approved";
        ReviewsData[reviewIndex].updatedAt = new Date()
          .toISOString()
          .split("T")[0];
        setData([...ReviewsData]);
      }
      toast.success(`Review ${review.id} has been restored`);
    }
  };

  const handleBulkDelete = () => {
    if (selectedReviews.length > 0) {
      setDeleteConfirmOpen(true);
    }
  };

  const confirmBulkDelete = () => {
    if (selectedReviews.length > 0) {
      // Update selected reviews to removed status
      selectedReviews.forEach((reviewId) => {
        const reviewIndex = ReviewsData.findIndex((r) => r.id === reviewId);
        if (reviewIndex !== -1) {
          ReviewsData[reviewIndex].status = "removed";
          ReviewsData[reviewIndex].updatedAt = new Date()
            .toISOString()
            .split("T")[0];
        }
      });

      setData([...ReviewsData]);
      setSelectedReviews([]);
      setSelectAll(false);

      toast.success(`${selectedReviews.length} review(s) have been removed`);
      setDeleteConfirmOpen(false);
    }
  };

  const cancelBulkDelete = () => {
    setDeleteConfirmOpen(false);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedReview(null);
  };

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half" className="text-yellow-400 text-xs" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} className="text-gray-400 text-xs" />
      );
    }

    return stars;
  };

  const statusClass = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "flagged":
        return "text-orange-400";
      case "removed":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  // Filter data based on status
  useEffect(() => {
    let filtered = ReviewsData;

    if (statusFilter !== "all") {
      filtered = filtered.filter((review) => review.status === statusFilter);
    }

    setFilteredData(filtered);

    // Update select all state based on filtered data
    const allFilteredSelected =
      filtered.length > 0 &&
      filtered.every((review) => selectedReviews.includes(review.id));
    setSelectAll(allFilteredSelected);
  }, [statusFilter, selectedReviews, data]);

  // Click outside handler for dropdown
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

  return (
    <div className="w-full flex flex-col gap-5">
      <header className="flex flex-col gap-5">
        <h2 className="text-2xl md:text-3xl font-medium">Ratings & Reviews</h2>
        <div className="flex items-center gap-5 px-4">
          <span>Filter:</span>
          {/* Status Filter Dropdown */}
          <div
            ref={statusDropdownRef}
            className="w-[200px] md:w-[250px] relative border border-black/30 hover:border-red-primary/50 
            duration-300 ease-in-out rounded-sm flex items-center justify-center cursor-pointer"
          >
            <div
              className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-3 md:px-6"
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
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                All
              </span>
              <span
                onClick={() => handleStatusFilter("approved")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                Approved
              </span>
              <span
                onClick={() => handleStatusFilter("flagged")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                Flagged
              </span>
              <span
                onClick={() => handleStatusFilter("removed")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                Removed
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Table */}
      <div className="border border-black/30 rounded-sm pt-4">
        <Table>
          <TableHeader>
            <TableRow className="border-b-black/30 hover:bg-transparent">
              <TableHead className="font-medium pb-3">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                  className="border border-black/50 accent-red-primary"
                />
              </TableHead>
              <TableHead className="font-medium pb-3">Review ID</TableHead>
              <TableHead className="font-medium pb-3">User</TableHead>
              <TableHead className="font-medium pb-3">Restaurant</TableHead>
              <TableHead className="font-medium pb-3">Rating</TableHead>
              <TableHead className="font-medium pb-3">Status</TableHead>
              <TableHead className="font-medium pb-3">
                <div className="flex items-center justify-between">
                  <span>Actions</span>
                  {selectedReviews.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {selectedReviews.length} selected
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
            {filteredData.length > 0 ? (
              filteredData.map((review, index) => (
                <TableRow key={review.id} className="border-b-black/30">
                  <TableCell className="p-3">
                    <Checkbox
                      checked={selectedReviews.includes(review.id)}
                      onCheckedChange={(checked) =>
                        handleSelectReview(review.id, checked as boolean)
                      }
                      className="border border-black/50 accent-red-primary"
                    />
                  </TableCell>
                  <TableCell className="p-3 font-medium">{review.id}</TableCell>
                  <TableCell className="p-3">{review.userName}</TableCell>
                  <TableCell className="p-3">{review.restaurant}</TableCell>
                  <TableCell className="p-3">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </TableCell>
                  <TableCell
                    className={`p-3 capitalize ${statusClass(review.status)}`}
                  >
                    {review.status}
                  </TableCell>
                  <TableCell className="p-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="border-0 focus:outline-none">
                        <BsThreeDotsVertical className="text-2xl text-black cursor-pointer hover:text-black/80" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full bg-white flex flex-col items-center justify-center gap-2 border-none p-3">
                        <DropdownMenuItem
                          onClick={() => handleAction("view", review)}
                          className="bg-transparent text-sm font-semibold w-full border border-red-primary 
                          text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                          rounded-md flex items-center justify-center"
                        >
                          View
                        </DropdownMenuItem>
                        {review.status === "flagged" && (
                          <DropdownMenuItem
                            onClick={() => handleAction("approve", review)}
                            className="bg-transparent text-sm font-semibold w-full border border-red-primary 
                            text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                            rounded-md flex items-center justify-center"
                          >
                            Approve
                          </DropdownMenuItem>
                        )}
                        {(review.status === "approved" ||
                          review.status === "flagged") && (
                          <DropdownMenuItem
                            onClick={() => handleAction("remove", review)}
                            className="bg-transparent text-sm font-semibold w-full border border-red-primary 
                            text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                            rounded-md flex items-center justify-center"
                          >
                            Remove
                          </DropdownMenuItem>
                        )}
                        {review.status === "removed" && (
                          <DropdownMenuItem
                            onClick={() => handleAction("restore", review)}
                            className="bg-transparent text-sm font-semibold w-full border border-red-primary 
                            text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                            rounded-md flex items-center justify-center"
                          >
                            Restore
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No reviews found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Bulk Delete Confirmation Modal */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent className="w-[95vw] max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-gray-900">
              Confirm Bulk Remove
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to remove{" "}
              <span className="font-semibold">
                {selectedReviews.length} selected review(s)
              </span>
              ? This action will mark them as removed but they can be restored
              later.
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
              Remove {selectedReviews.length} Review(s)
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Review View Modal */}
      <AlertDialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <AlertDialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          <div className="p-4 md:p-6">
            <AlertDialogHeader>
              <AlertDialogTitle className="w-full max-w-[80%] md:max-w-2/3 mx-auto text-lg md:text-xl flex items-center gap-3 justify-between">
                <span>Review Details Modal</span>
                <X
                  onClick={closeViewModal}
                  className="ml-2 w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:text-gray-600"
                />
              </AlertDialogTitle>
            </AlertDialogHeader>

            {selectedReview && (
              <div className="w-full max-w-[80%] md:max-w-2/3 mx-auto space-y-4 mt-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400 text-sm font-semibold">
                      User:
                    </span>
                    <span className="text-black/70">
                      {selectedReview.userName}
                      <span className="text-black/70 ml-2">
                        (ID: {selectedReview.id})
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400 text-sm font-semibold">
                      Restaurant:
                    </span>
                    <span className="text-black/70">
                      {selectedReview.restaurant}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400 text-sm font-semibold">
                      Rating:
                    </span>
                    <div className="flex items-center gap-2">
                      {renderStars(selectedReview.rating)}
                      <span className="text-black/70 font-medium">
                        ({selectedReview.rating}/5)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400 text-sm font-semibold">
                      Review:
                    </span>
                    <p className="text-black/80 leading-relaxed">
                      {selectedReview.review}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400 text-sm font-semibold">
                      Status:
                    </span>
                    <span
                      className={`capitalize font-medium ${statusClass(
                        selectedReview.status
                      )}`}
                    >
                      {selectedReview.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400 text-sm font-semibold">
                      Date Added:
                    </span>
                    <span className="text-black/70">
                      {new Date(selectedReview.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <AlertDialogFooter className="w-full max-w-[80%] md:max-w-2/3 mx-auto mt-6 flex justify-end">
              {selectedReview && selectedReview.status === "removed" ? (
                <button
                  onClick={() => handleAction("restore", selectedReview)}
                  className="w-full md:w-1/2 py-3 px-6 bg-red-primary hover:bg-red-primary/90 
                text-white border border-transparent rounded-sm transition-colors duration-200 ease-in-out"
                >
                  Restore
                </button>
              ) : selectedReview &&
                (selectedReview.status === "approved" ||
                  selectedReview.status === "flagged") ? (
                <button
                  onClick={() => handleAction("remove", selectedReview)}
                  className="w-full md:w-1/2 py-3 px-6 bg-red-primary hover:bg-red-primary/90 
                text-white border border-transparent rounded-sm transition-colors duration-200 ease-in-out"
                >
                  Remove
                </button>
              ) : selectedReview && selectedReview.status === "flagged" ? (
                <button
                  onClick={() => handleAction("approve", selectedReview)}
                  className="w-full md:w-1/2 py-3 px-6 bg-red-primary hover:bg-red-primary/90 
                text-white border border-transparent rounded-sm transition-colors duration-200 ease-in-out"
                >
                  Approve
                </button>
              ) : null}
              <button
                onClick={closeViewModal}
                className="w-full md:w-1/2 py-3 px-6 bg-gray-300 hover:bg-gray-300/80 
                text-black border border-transparent rounded-sm transition-colors duration-200 ease-in-out"
              >
                Close
              </button>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default RatingsTable;
