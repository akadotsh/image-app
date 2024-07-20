"use client";

import { graphqlClient } from "@/graphqlClient";
import { RootState } from "@/lib/reduxStore";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useSelector } from "react-redux";
import { MyImages } from "@/lib/types";
import Image from "next/image";
import { CardSkeleton } from "./card-skeleton";

const MY_IMAGES = gql`
  query getAllImages($id: ID!) {
    getAllMyProfilePictures(userId: $id) {
      id
      url
      filename
    }
  }
`;

export const Gallery = () => {
  const id = useSelector((state: RootState) => {
    return state.auth.userId;
  });

  const { isLoading, data } = useQuery<{
    getAllMyProfilePictures: MyImages[];
  }>({
    queryKey: ["myimages"],
    queryFn: async () => graphqlClient.request(MY_IMAGES, { id }),
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: true,
  });

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Images
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {isLoading
            ? Array.from({ length: 3 }).map((item, idx) => (
                <CardSkeleton key={idx} />
              ))
            : null}
          {!isLoading &&
            data?.getAllMyProfilePictures.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
              >
                <Image
                  src={image.url}
                  alt={image.filename}
                  width={600}
                  height={400}
                  className="w-full h-60 object-cover"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
