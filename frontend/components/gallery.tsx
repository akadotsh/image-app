"use client";

import { graphqlClient } from "@/graphqlClient";
import { RootState } from "@/lib/reduxStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { MyImages } from "@/lib/types";
import Image from "next/image";
import { CardSkeleton } from "./card-skeleton";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { DELETE_IMAGE, MY_IMAGES } from "@/lib/graphqQueries";

export const Gallery = () => {
  const id = useSelector((state: RootState) => {
    return state.auth.userId;
  });

  const { isLoading, data, refetch } = useQuery<{
    getAllMyProfilePictures: MyImages[];
  }>({
    queryKey: ["myimages"],
    queryFn: async () => graphqlClient.request(MY_IMAGES, { id }),
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: true,
  });

  const deleteImageMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      graphqlClient.request(DELETE_IMAGE, { id }),
    onSuccess(data) {
      toast.success("successfully deleted the image");
    },
    onError() {
      toast.error("failed to delete the image");
    },
  });

  const handleDeleteImage = (id: string) => {
    deleteImageMutation.mutate({ id });
    refetch();
  };

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
                className="group relative overflow-hidden rounded-lg cursor-pointer flex flex-col items-center"
              >
                <Image
                  src={image.url}
                  alt={image.filename}
                  width={600}
                  height={400}
                  className="w-full h-60 object-cover"
                />
                <Button
                  variant={"destructive"}
                  className="w-full mt-2"
                  onClick={() => handleDeleteImage(image.id)}
                  disabled={deleteImageMutation.isPending}
                >
                  Remove
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
