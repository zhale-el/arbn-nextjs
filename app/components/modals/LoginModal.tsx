"use client";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";

import axios from "axios";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/input";
import Button from "../Button";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        type="password"
        label="Password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={registerModal.onClose}
            className="text-stone-800  cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
