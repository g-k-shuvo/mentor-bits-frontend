import { useEffect } from "react";
import { useRouter } from "next/router";

const VerifyEmail = () => {
  const router = useRouter();

  useEffect(() => {
    // Get the token from the route parameters
    const { token, role } = router.query;

    if (token) {
      // Make a POST request to the backend to verify the email
      fetch("http://localhost:8080/v1/user/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          role, // Assuming a static role for email verification
        }),
      })
        .then((response) => {
          console.log(response);

          if (!response.ok) {
            throw new Error("Email verification failed");
          }

          console.log("Email verified successfully");
          router.push("/user/auth/verification-success"); // Redirect to a success page
        })
        .catch((error) => {
          // Handle error, e.g., redirect to an error page
          console.error("Email verification error:", error.message);
          router.push("/user/auth/verification-error"); // Redirect to an error page
        });
    }
  }, [router.query.token]);

  return <div>verifying...</div>;
};

export default VerifyEmail;
