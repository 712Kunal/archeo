import { BrowserRouter, Route, Routes } from "react-router";
import "@/App.css";
import AccountSection from "@/features/account/AccountSection";
import ActivityLogPage from "@/features/account/pages/ActivityLog.page";
import ContactsPage from "@/features/account/pages/Contacts.page";
import ProfilePage from "@/features/account/pages/Profile.page";
import SettingsPage from "@/features/account/pages/Settings.page";
import APILayout from "@/features/api/APILayout";
import AnalyticsPage from "@/features/api/pages/Analytics.page";
import ConfigPage from "@/features/api/pages/Config.page";
import RequestsPage from "@/features/api/pages/Requests.page";
import UsagePage from "@/features/api/pages/Usage.page";
import AuthLayout from "@/features/auth/AuthLayout";
import LoginPage from "@/features/auth/pages/Login.page";
import RegisterPage from "@/features/auth/pages/Register.page";
import DashboardPage from "@/features/dashboard/Dashboard.page";
import DocumentPage from "@/features/document/Document.page";
import DocumentLayout from "@/features/document/DocumentLayout";
import AboutPage from "@/features/landing/About.page";
import LandingPage from "@/features/landing/Landing.page";
import DocumentsListPage from "@/features/library/documents/DocumentsList.page";
import LibrarySection from "@/features/library/LibrarySection";
import TemplatesListPage from "@/features/library/templates/TemplatesList.page";
import EditTemplatePage from "@/features/template/EditTemplate.page";
import TemplatePage from "@/features/template/Template.page";
import TemplateLayout from "@/features/template/TemplateLayout";
import VerificationPage from "@/features/verify/verification.page";
import AppLayout from "@/shared/layout/AppLayout";
import { ROLES } from "@/shared/constants/roles.constant";
import { RouteGuard } from "@/features/auth/components/utils/RouteGuard";
import NotFoundPage from "@/shared/routing/NotFound.page";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModernSignupForm from "@/features/auth/pages/RegisterUser.page.jsx";
import RegisterUserPage from "@/features/auth/pages/RegisterUser1.page.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="about" element={<AboutPage />} />

				<Route element={<AuthLayout />}>
					<Route path="login/:role?" element={<LoginPage />} />
					<Route path="register/:role?" element={<RegisterPage />} />
				</Route>

				<Route path="app" element={<AppLayout />}>
					<Route index element={<DashboardPage />} />

					<Route path="library" element={<LibrarySection />}>
						{/* templatesList only for issuer */}
						<Route
							path="templates"
							element={
								<RouteGuard
									allowedRoles={[ROLES.ISSUER]}
									routeComponent={<TemplatesListPage />}
								/>
							}
						/>
						<Route path="documents" element={<DocumentsListPage />} />
					</Route>

					<Route path="account" element={<AccountSection />}>
						<Route index element={<ProfilePage />} />
						<Route path="settings" element={<SettingsPage />} />
						<Route path="activity" element={<ActivityLogPage />} />
						<Route path="contacts" element={<ContactsPage />} />
					</Route>

					<Route path="document" element={<DocumentLayout />}>
						<Route path=":documentId/view?" element={<DocumentPage />} />
					</Route>

					{/* complete template section only for issuers */}
					<Route
						path="template"
						element={
							<RouteGuard
								allowedRoles={[ROLES.ISSUER]}
								routeComponent={<TemplateLayout />}
							/>
						}
					>
						<Route
							path=":templateId/view?"
							element={
								<RouteGuard
									allowedRoles={[ROLES.ISSUER]}
									routeComponent={<TemplatePage />}
								/>
							}
						/>
						<Route
							path=":templateId/edit"
							element={
								<RouteGuard
									allowedRoles={[ROLES.ISSUER]}
									routeComponent={<EditTemplatePage />}
								/>
							}
						/>
					</Route>

					{/* complete api section only for verifiers */}
					<Route
						path="api"
						element={
							<RouteGuard
								allowedRoles={[ROLES.VERIFIER]}
								routeComponent={<APILayout />}
							/>
						}
					>
						<Route
							index
							element={
								<RouteGuard
									allowedRoles={[ROLES.VERIFIER]}
									routeComponent={<AnalyticsPage />}
								/>
							}
						/>
						<Route
							path="usage"
							element={
								<RouteGuard
									allowedRoles={[ROLES.VERIFIER]}
									routeComponent={<UsagePage />}
								/>
							}
						/>
						<Route
							path="config"
							element={
								<RouteGuard
									allowedRoles={[ROLES.VERIFIER]}
									routeComponent={<ConfigPage />}
								/>
							}
						/>
						<Route
							path="requests"
							element={
								<RouteGuard
									allowedRoles={[ROLES.VERIFIER]}
									routeComponent={<RequestsPage />}
								/>
							}
						/>
					</Route>
				</Route>

				<Route path="verify/:qr_url" element={<VerificationPage />} />

				{/* TEST ONLY ROUTE */}
				<Route path="test/:role?" element={<RegisterUserPage />} />

				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</BrowserRouter>
	);
}

export default App;
