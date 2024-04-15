"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//udah dari sono nya
import {signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

//object input form nya
type UserAuthForm = {
  email: string;
  password: string;
  // username: string;
};

//validation input menggunakan yup
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    // username: yup.string().uuid().required(),
  })
  .required();

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {toast} = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  //component react hook form
  //register berfungsi mendaftarkan validator untuk component sesuai name nya
  //yupresolver harus memiliki validasi input yang sama dg object input nya
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserAuthForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: UserAuthForm) => {
    try {
      //ini blum bisa
      const user = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: searchParams.get("callbackUrl") || "/",
        redirect: false,
      })
      console.log('ini user', user);
      if(!user?.error){
        router.push(user?.url || "/"); 
      }else{
        toast({
          title: "Something went wrong",
          description: "Please check your email and password",
          variant: "destructive",
          duration: 2000,
        });
      }
    } catch (error) {
      console.log("onSubmit : ", data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[100%] items-center"
    >
      <div className="w-[100%] text-3xl font-semibold tracking-widest mb-2 text-center">
        Masuk akun anda
      </div>
      
      <div className="w-[100%] relative">
        <Input
          className="w-[100%] p-4 rounded-sm"
          type="text"
          placeholder="Email"
          {...register("email")}
          // prefix="person"
          error={errors.email?.message}
        />
        {/* <br></br> */}
        
      </div>
      
      {/* <div className="w-[100%] relative"> */}
      <Input
          className="w-[100%] p-4 rounded-sm mt-8"
          type={showPassword ? "text" : "password"}
          placeholder="Kata Sandi"
          suffix="Eye"
          onPressSuffix={() => setShowPassword(!showPassword)}
          {...register("password")}
          error={errors.password?.message}
        />
      {/* </div> */}

      <Button
        type="submit"
        className={cn("w-[320px] bg-leaf mt-6", hover.shadow)}
        onClick={() => {
          router.push("/");
        }}
      >
        Masuk
      </Button>
    </form>
  );
}

export default SignInForm;
