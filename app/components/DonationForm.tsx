"use client";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "../api-client/payments";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { requestBodySchema } from "../api/v1/checkout-sessions/create/route.schema";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface Props {
  productId: string;
}

export type FormData = z.infer<typeof requestBodySchema>;

const DonationForm = ({ productId }: Props) => {
  const router = useRouter();

  // const modalRef = useRef<HTMLDialogElement>(null);
  // TODO: Modal ref is not used in this component. Shold it be removed? or used?

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      customer: {
        address: {
          city: "yokohama",
          country: "JP",
          line1: "testline 1",
          line2: "testline2",
          postal_code: "2334213",
        },
        email: "koiralabishwas257@gmail.com",
        name: "Bishwas Koirla",
        phone: "08035118306",
      },
      price: 9999,
      product_id: "prod_QdR5Wd8GjakPq5",
    },
    resolver: zodResolver(requestBodySchema),
  });

  // react query logics
  const {
    mutate: checkoutSession,
    data: client_secret,
    isIdle,
    isPending,
  } = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (client_secret) =>
      router.push(`/payment?client_secret=${client_secret}`),
    onError: (error) => console.log(error),
  });

  //
  const onSubmit = useCallback(
    async (formData: FormData) => {
      console.log("submitted data", formData);
      try {
        await checkoutSession(formData);
        // modalRef.current?.showModal();
      } catch (error) {
        console.error("Error fetching client secret:", error);
      } finally {
        console.log(client_secret);
      }
    },
    [checkoutSession, client_secret]
  );

  return (
    <div className="w-full p-2 md:grid md:grid-cols-[0.2fr,0.6fr,0.2fr] md:p-5  ">
      <div className="hidden md:block " />
      <form
        className={clsx("bg-white rounded-lg p-5 border border-gray-600", {
          hidden: !isIdle,
        })}
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.product_id?.message}
        <Input type="hidden" {...register("product_id")} value={productId} />

        <div className="mb-4">
          <Label className=" text-black">Price</Label>
          <Input
            type="number"
            className="input input-bordered w-full"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-4">
          <Label className=" text-gray-600">
            Name
          </Label>
          <Input
            type="text"
            className="input input-bordered w-full bg-gray-100"
            {...register("customer.name")}
          />
          {errors.customer?.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.customer.name.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label className=" text-gray-600">
            Email
          </Label>
          <Input
            type="email"
            className="input input-bordered w-full bg-gray-100"
            {...register("customer.email")}
          />
          {errors.customer?.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.customer.email.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label className=" text-gray-600">
            Phone
          </Label>
          <Input
            type="text"
            className="input input-bordered w-full bg-gray-100"
            {...register("customer.phone")}
          />
          {errors.customer?.phone && (
            <p className="text-red-500 text-xs mt-1">
              {errors.customer.phone.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label className=" text-gray-600">
            Country
          </Label>
          <Input
            type="text"
            className="input input-bordered w-full bg-gray-100"
            {...register("customer.address.country")}
          />
          {errors.customer?.address?.country && (
            <p className="text-red-500 text-xs mt-1">
              {errors.customer.address.country.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label className=" text-gray-600">
            Postal Code
          </Label>
          <Input
            type="text"
            className="input input-bordered w-full bg-gray-100"
            {...register("customer.address.postal_code")}
          />
          {errors.customer?.address?.postal_code && (
            <p className="text-red-500 text-xs mt-1">
              {errors.customer.address.postal_code.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label className=" text-gray-600">
            City
          </Label>
          <Input
            type="text"
            className="input input-bordered w-full bg-gray-100"
            {...register("customer.address.city")}
          />
          {errors.customer?.address?.city && (
            <p className="text-red-500 text-xs mt-1">
              {errors.customer.address.city.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label className=" text-gray-600">
            Line 1
          </Label>
          <Input
            type="text"
            className="input input-bordered w-full bg-gray-100"
            {...register("customer.address.line1")}
          />
          {errors.customer?.address?.line1 && (
            <p className="text-red-500 text-xs mt-1">
              {errors.customer.address.line1.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label className=" text-gray-600">
            Line 2
          </Label>
          <Input
            type="text"
            className="input input-bordered w-full bg-gray-100"
            {...register("customer.address.line2")}
          />
          {errors.customer?.address?.line2 && (
            <p className="text-red-500 text-xs mt-1">
              {errors.customer.address.line2.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="btn btn-brand w-full border-none "
        >
          Submit
        </Button>
      </form>
      {isPending && (
        <div className="flex justify-center">
          <span className="loading loading-dots loading-lg text-white" />
        </div>
      )}
      <div className="hidden md:block" />
    </div>
  );
};

export default DonationForm;
