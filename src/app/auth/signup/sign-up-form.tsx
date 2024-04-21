"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterMutation } from "@/services/auth";

//object input form nya
type UserSignUpForm = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

//validation input menggunakan yup
const schema = yup
  .object({
    name: yup.string().min(10).required() ,
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirm_password: yup.string().oneOf([yup.ref("password")], "Password must match").required(),
    // username: yup.string().uuid().required(),
  })
  .required();


function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm<UserSignUpForm>({
      resolver: yupResolver(schema),
    });
  
    const [registerMutation] = useRegisterMutation();

    const onSubmit = async (data: UserSignUpForm) => {
      try {
        const res = await registerMutation(data);
        console.log("result register : ", JSON.stringify(res));
      } catch (error) {
        console.log("onSubmit : ", data);
      }
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[100%] items-center">
      <div className="w-[100%] text-3xl font-semibold tracking-widest mb-2 text-center">
        Buat akun baru
      </div>
      <Input
        className="w-[100%] p-4 rounded-sm mt-4"
        type="text"
        placeholder="Nama Lengkap"
        {...register("name")}
        error={errors.name?.message}
      />
      <Input
        className="w-[100%] p-4 rounded-sm mt-8"
        type="text"
        placeholder="Email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        className="w-[100%] p-4 rounded-sm mt-4"
        type={showPassword ? "text" : "password"}
        placeholder="Kata Sandi"
        suffix="Eye"
        onPressSuffix={() => setShowPassword(!showPassword)}
        {...register("password")}
        error={errors.password?.message}
      />
      {/* <div className="w-[100%] relative">
        
      </div> */}
      <Input
        className="w-[100%] p-4 rounded-sm mt-4"
        type={showConfirmationPassword ? "text" : "password"}
        placeholder="Konfirmasi Kata Sandi"
        suffix="Eye"
        onPressSuffix={() =>
          setShowConfirmationPassword(!showConfirmationPassword)
        }
        {...register("confirm_password")}
        error={errors.confirm_password?.message}
      />
      {/* <div className="w-[100%] relative">
        
      </div> */}

      <Button type="submit" className={cn("w-[320px] bg-leaf mt-6", hover.shadow)}>
        Buat Akun
      </Button>
    </form>
  );
}

export default SignUpForm;
