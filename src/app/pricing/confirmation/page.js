"use client";

import { GetTransactionStatus } from "@/api/payment/route";
import useFetchUserData from "@/components/hooks/useFetchUserData.hook";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";


function ConfirmationContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [data, set_data] = useState("loading");

  const fetchedData = useFetchUserData();

  const getStatus = useCallback(
    async (id) => {
      if (!id || !fetchedData?.email) return;
      try {
        const res = await GetTransactionStatus(id, fetchedData.email);
        if (res.data?.payment_status_description === "Failed") {
          set_data("Failed");
        } else if (res.data?.payment_status_description === "Completed") {
          set_data("Completed");
        }
      } catch (err) {
        console.error(err);
      }
    },
    [fetchedData]
  );

  useEffect(() => {
    const id = params?.get("OrderTrackingId");
    getStatus(id);
  }, [getStatus, params]);

  return (
    <Center>
      {data === "loading" && <Loading_page />}
      {data === "Failed" && <Error_page />}
      {data === "Completed" && <Success_page />}
    </Center>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}

const Loading_page = () => {
  const router = useRouter();
  return (
    <Box p="6" textAlign="center">
      <Text fontSize="xl" fontWeight="bold">
        Loading...!!
      </Text>
      <Text my="4">Wait as we fetch your transaction status</Text>
      <Flex gap="2">
        <Button
          rightIcon={<FaLongArrowAltRight />}
          bg="#3874ff"
          color="white"
          my="4"
          onClick={() => router.push("/")}
        >
          Go to HomePage
        </Button>
        <Button
          rightIcon={<HiOutlineRefresh />}
          bg="gray.700"
          color="white"
          my="4"
          onClick={() => router.push("/pricing")}
        >
          try again
        </Button>
      </Flex>
    </Box>
  );
};

const Success_page = () => {
  const router = useRouter();
  return (
    <Box p="6" textAlign="center">
      <Image alt="image" src="../order_confirmation.jpg" boxSize={400} />
      <Text fontSize="xl" fontWeight="bold">
        Success!!
      </Text>
      <Text my="4">We are happy for joining our paid plan</Text>
      <Text>You have access to all our exciting features!</Text>
      <Button
        rightIcon={<FaLongArrowAltRight />}
        bg="#3874ff"
        color="white"
        my="4"
        onClick={() => router.push("/")}
      >
        Go to HomePage
      </Button>
    </Box>
  );
};

const Error_page = () => {
  const router = useRouter();
  return (
    <Box p="6" textAlign="center">
      <Image alt="image" src="../error.jpg" boxSize={400} />
      <Text fontSize="xl" fontWeight="bold">
        Something went wrong!!
      </Text>
      <Text my="4">We are sad that the payment failed</Text>
      <Text>Try again in a few moments!</Text>
      <Flex gap="2">
        <Button
          rightIcon={<FaLongArrowAltRight />}
          bg="#3874ff"
          color="white"
          my="4"
          onClick={() => router.push("/")}
        >
          Go to HomePage
        </Button>
        <Button
          rightIcon={<HiOutlineRefresh />}
          bg="gray.700"
          color="white"
          my="4"
          onClick={() => router.push("/pricing")}
        >
          try again
        </Button>
      </Flex>
    </Box>
  );
};
