"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CloudUploadIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { endpoint } from "@/graphqlClient";
import { storage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const UploadImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  //  since graphql-request does not support file upload using FormData
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append(
      "operations",
      JSON.stringify({
        query: `
        mutation uploadPicture($file: Upload!) {
          uploadPicture(file: $file) {
            id
            url
            userId
          }
        }
      `,
        variables: { file: null },
      })
    );
    formData.append("map", JSON.stringify({ "0": ["variables.file"] }));
    formData.append("0", file);
    const token = storage.get("token");
    const parsedToken = token ? JSON.parse(token) : "";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        authorization: `Bearer ${parsedToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    return response.json();
  };

  const uploadImageMutation = useMutation({
    mutationFn: (file: File) => uploadImage(file),
    onSuccess(data) {
      setFile(null);
      setPreview("");
    },
    onError(err) {
      setFile(null);
      setPreview("");
    },
    onSettled() {},
  });

  return (
    <div className="px-4 flex justify-center items-center mt-10">
      <div className="w-full sm:w-1/2">
        <div className="grid gap-6 w-full mx-auto p-4">
          <div className="grid gap-2">
            <Label htmlFor="image">
              <Card className="group border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 flex flex-col items-center justify-center text-center transition-colors hover:border-primary cursor-pointer">
                <p className="cursor-pointer bg-gray-700 text-white rounded-sm p-1">
                  Upload an image
                </p>
                <input
                  type="file"
                  id="image"
                  className="sr-only peer"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <CloudUploadIcon className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  click to upload
                </p>
                <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  PNG, JPG, GIF up to 10MB
                </p>
              </Card>
            </Label>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="preview">Preview</Label>
            <Card className="overflow-hidden rounded-lg">
              <img
                id="preview"
                src={preview ?? ""}
                width={600}
                height={400}
                alt="Preview"
                className="object-cover w-full aspect-[3/2]"
              />
            </Card>
          </div>
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground"
              disabled={uploadImageMutation.isPending}
              onClick={() => {
                if (file) {
                  uploadImageMutation.mutate(file);
                }
              }}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
