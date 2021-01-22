import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      //NavBar
      "dangnhap": "Login",
      "dangxuat": "Logout",
      "trangchu": "Home",
      "yeucaudatxe": "Request Booking",
      "lichsudatxe": "Booking History",
      "admin": "Admin",

      //History booking page
      "danhsachxedadat": "List Car Booked",
      "sothutu": "No",
      "ngaydi": "Moving Date",
      "ngayve": "Returning Date",
      "diadiemdon": "Location",
      "diadiemden": "Destination",
      "songuoidi": "Total Person",
      "trangthai": "Status",
      "hanhdong": "Action",

      //Status history booking
      "duocduyet": "Success",
      "tuchoi": "Reject",
      "nhap": "Draft",
      "doiduyet": "Waiting",

      //Button history booking
      "xoayeucau": "DELETE",
      "suayeucau": "UPDATE",
      "nhanban": "DUPLICATE",

      //Request booking page
      "thongtinnguoidat": "Booker Information",
      "hovaten": "Full Name",
      "tenbu": "BU Name",
      "nguoiquanli": "Line Manager",
      "sodienthoai": "Phone",
      "phongban": "Department",
      "thongtindatxe": "Booking Information",
      "maildennguoilienquan": "Mail To Relate Persons",
      "lydodatxe": "Reason Book",
      // "ngaybatdaudi": "Ngày Đi",
      // "ngaybatdauve": "Ngày Về",
      // "diadiemdon": "Địa Điểm Đón",
      // "diadiemden": "Địa Điểm Đến"
      "thongtinnoidon": "Pickup Information",
      "giodon": "Pickup Time",
      "nhanvien": "Employees",
      "khach": "Guest",
      "ghichu": "Note",
      "themdiadiem": "Add More",
      
    }
  },
  vn: {
    translation: {
      //NavBar
      "dangnhap": "Đăng Nhập",
      "dangxuat": "Đăng Xuất",
      "trangchu": "Trang Chủ",
      "yeucaudatxe": "Yêu Cầu Đặt Xe",
      "lichsudatxe": "Lịch Sử Đặt Xe",
      "admin": "Admin",

      //History booking page
      "danhsachxedadat": "Danh Sách Xe Đã Đặt",
      "sothutu": "STT",
      "ngaydi": "Ngày Đi",
      "ngayve": "Ngày Về",
      "diadiemdon": "Địa Điểm Đón",
      "diadiemden": "Địa Điểm Đến",
      "songuoidi": "Số Người Đi",
      "trangthai": "Trạng Thái",
      "hanhdong": "Hành Động",

      //Status history booking
      "duocduyet": "Đã Được Duyệt",
      "tuchoi": "Bị Từ Chối",
      "nhap": "Nháp",
      "doiduyet": "Đang Đợi Duyệt",

      //Button history booking
      "xoayeucau": "XÓA",
      "suayeucau": "SỬA",
      "nhanban": "NHÂN BẢN",

      //Request booking page
      "thongtinnguoidat": "Thông Tin Người Đặt",
      "hovaten": "Họ Và Tên",
      "tenbu": "Tên BU",
      "nguoiquanli": "Quản lí",
      "sodienthoai": "Điện Thoại",
      "phongban": "Phòng Ban",
      "thongtindatxe": "Thông Tin Đặt Xe",
      "maildennguoilienquan": "Mail Người Liên Quan",
      "lydodatxe": "Lí Do Đặt Xe",

      "thongtinnoidon": "Thông Tin Nới Đón",
      "giodon": "Giờ Đón",
      "nhanvien": "Nhân Viên",
      "khach": "Khách",
      "ghichu": "Ghi Chú",
      "themdiadiem": "THÊM NƠI ĐÓN",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vn",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;