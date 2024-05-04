import AdminPage from "../pages/AdminPage/AdminPage";
import Doctor from "../pages/AdminPage/Doctor/Doctor";
import DoctorList from "../pages/AdminPage/Doctor/DoctorList";
import UserList from "../pages/AdminPage/UserList";
import DoctorDetail from "../pages/DoctorPage/DoctorDetail";
import DoctorPage from "../pages/DoctorPage/DoctorPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ThongTinBenhVien from "../pages/ThongTinBenhVien/ThongTinBenhVien";

export const routes =[
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/signin',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/signup',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/thongtinbenhvien',
        page: ThongTinBenhVien,
        isShowHeader: true
    },
    {
        path: '/admin',
        page: AdminPage,
        isShowHeader: true
    },
    {
        path: '/admin/doctor',
        page: Doctor,
        isShowHeader: true
    },
    {
        path: '/admin/doctor/list',
        page: DoctorList,
        isShowHeader: true
    },
    {
        path: '/admin/user/list',
        page: UserList,
        isShowHeader: true
    },
    {
        path: '/doctor',
        page: DoctorPage,
        isShowHeader: true
    },
    {
        path: '/doctor/:id',
        page: DoctorDetail,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    },
];