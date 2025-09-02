import type { Metadata } from "next";
import RatingsTable from "@/app/components/rating-&-reviews/RatingsTable";

export const metadata: Metadata = {
  title: "Rating & Reviews | Prime Table Admin",
  description: "see customer ratings & reviews of our restaurants",
};

function RatingAndReviews() {
  return (
    <section className="w-full flex flex-col gap-5 p-5">
      <RatingsTable />
    </section>
  );
}

export default RatingAndReviews;
