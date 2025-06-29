import { apiSlice } from "@/shared/reducer/slice.barrel";

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (authCredentials) => ({
				url: "/auth/login",
				method: "POST",
				body: authCredentials,
			}),
			invalidatesTags: ["Auth"],
		}),

		verifyEmail: builder.mutation({
			query: (userEmail) => ({
				url: "/auth/verifyEmail",
				method: "POST",
				body: userEmail,
			})
		}),

		verifyEmailOTP: builder.mutation({
			query: ({ email, otp }) => ({
				url: "/auth/verifyEmailOTP",
				method: "POST",
				body: { email, otp },
			}),
		}),

		register: builder.mutation({
			query: (userData) => ({
				url: "/auth/registerUser",
				method: "POST",
				body: userData,
			}),
		}),

		registerOrganization: builder.mutation({
			query: (userData) => ({
				url: "/auth/registerOrg",
				method: "POST",
				body: userData,
			}),
		}),

		logout: builder.mutation({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
			invalidatesTags: ["Auth"],
		}),

		getCurrentUser: builder.query({
			query: () => "/auth/current-user",
			providesTags: ["Auth"],
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useRegisterOrganizationMutation,
	useLogoutMutation,
	useGetCurrentUserQuery,
	useVerifyEmailMutation,
	useVerifyEmailOTPMutation,
} = authApi;
