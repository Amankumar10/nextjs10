"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLazyGetUserQuery } from "../rtkQuery/api/endpoints/accountApi";
import { useDispatch, useSelector } from "react-redux";
import FullPageLoader from "../components/FullPageLoading";
import { logout, setUser } from "../rtkQuery/slices/authSlice";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function AuthCheck({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [getUser, { isLoading, error, data }] = useLazyGetUserQuery();

  useEffect(() => {
    if (error?.status === 401) {
      router.push("/login");
    }
  }, [error, router]); // Runs only when error changes

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser().unwrap();
        dispatch(setUser(response));
        console.log("logged in");
      } catch (err) {
        dispatch(logout());
        router.push("/login");
        console.error("Error fetching user:", err);
      }
    };
    if (
      !pathname.includes("forgot-password") &&
      !pathname.includes("reset-password")
    ) {
      fetchUser();
    }
  }, [isAuthenticated, dispatch, getUser]);

  // Show loading state while checking auth
  if (isLoading) {
    return <FullPageLoader />;
  }

  return <SnackbarProvider>{children}</SnackbarProvider>;
}
