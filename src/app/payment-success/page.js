'use client'
import { Suspense } from "react";
import PaymentSuccess from "@/components/payment-success";
const Page = () => {
  return (
    <Suspense>
      <PaymentSuccess />
    </Suspense>
  )
}

export default Page;