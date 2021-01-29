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
      "yeucaudatxe": "Booking Request",
      "lichsudatxe": "Booking History",
      "admin": "Admin",

      //History booking page
      "danhsachxedadat": "List Car Booked",
      "sothutu": "No",
      "ngaydi": "From Date",
      "ngayve": "To Date",
      "diadiemdon": "From Location",
      "diadiemden": "To Location",
      "songuoidi": "Total Participant",
      "trangthai": "Status",
      "hanhdong": "Action",

      //Status history booking
      "duocduyet": "Success",
      "tuchoi": "Reject",
      "nhap": "Draft",
      "doiduyet": "Waiting",

      //Button history booking
      "xoayeucau": "Delete",
      "suayeucau": "Update",
      "nhanban": "Duplicate",
      "huybo": "Cancel",
      "luu": "Save",
      "chitiet": "Detail",

      //Request booking page
      "thongtinnguoidat": "BOOKER INFORMATION",
      "hovaten": "Full Name",
      "tenbu": "BU Name",
      "nguoiquanli": "Line Manager",
      "sodienthoai": "Phone",
      "phongban": "Department",
      "maildennguoilienquan": "Mail To Related People",
      "lydodatxe": "Reason Book",
      // "ngaybatdaudi": "Ngày Đi",
      // "ngaybatdauve": "Ngày Về",
      // "diadiemdon": "Địa Điểm Đón",
      // "diadiemden": "Địa Điểm Đến"
      "thongtinnoidon": "BOOKING INFORMATION",
      "giodon": "Time",
      "nhanvien": "Employees",
      "khach": "Guest",
      "ghichu": "Note",
      "themdiadiem": "Add More",

      "chitietnoidon": "LOCATION DETAIL",
      "xacnhan": "Accepted",
      "quaylai": "Back",
      "noidon": "Location",
      "themchitiet": "ADD MORE DETAIL",
      "luuvagui": "Save And Send",
      "lichsu": "HISTORY",
      "danhsachyeucau": "REQUEST LIST",
      "lido": "REASON",
      "thongtinxevataixe": "DRIVER AND CAR INFORMATION",
      "tentaixe": "Driver Name",
      "sodienthoaitaixe": "Driver Phone",
      "biensoxe": "Car Number",
      "socho": "Total Seat",
      "chonxengaydi": "Moving Car",
      "chonxengayve": "Returning Car",
      "ghichuchotaixe": "Note For Driver",
      "trangthaixe": "Car Status",
      "quanlixe": "Car Management",
      "quanlitaixe": "Driver Management",
      "xulidatxe": "Handle Request",
      "danhsachxe": "CAR LIST",
      "vitrihientai": "Current Location",
      "hangxe": "Car Manufacturer",
      "tenxe": "Car Name",
      "themxemoi": "Add More Car",
      "chonbu": "Selected BU",
      "themtaixe": "Add More Driver",
      "danhsachtaixe": "DRIVER LIST",
      "xedanglai": "Car",
      "chonxe": "Pick A Car",
      "tienganh": "English",
      "tiengviet": "VietNamese"
      
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
      "xoayeucau": "Xóa",
      "suayeucau": "Cập Nhật",
      "nhanban": "Nhân Bản",
      "luu": "Lưu",
      "huybo": "Hủy",
      "chitiet": "Chi Tiết",

      //Request booking page
      "thongtinnguoidat": "THÔNG TIN NGƯỜI ĐẶT",
      "hovaten": "Họ Và Tên",
      "tenbu": "Tên BU",
      "nguoiquanli": "Quản lí",
      "sodienthoai": "Điện Thoại",
      "phongban": "Phòng Ban",
      "maildennguoilienquan": "Mail Người Liên Quan",
      "lydodatxe": "Lí Do Đặt Xe",

      "thongtinnoidon": "THÔNG TIN NƠI ĐÓN",
      "giodon": "Giờ Đón",
      "nhanvien": "Nhân Viên",
      "khach": "Khách",
      "ghichu": "Ghi Chú",
      "themdiadiem": "Thêm Nơi Đón",

      "chitietnoidon": "CHI TIẾT NƠI ĐÓN",
      "xacnhan": "Xác Nhận",
      "quaylai": "Quay Lại",
      "noidon": "Nơi Đón",
      "themchitiet": "THÊM CHI TIẾT",
      "luuvagui": "Lưu Và Gửi",
      "lichsu": "LỊCH SỬ ĐẶT XE",
      "danhsachyeucau": "DANH SÁCH YÊU CẦU",
      "lido": "LÍ DO",
      "thongtinxevataixe": "THÔNG TIN XE VÀ TÀI XẾ",
      "tentaixe": "Tên Tài Xế",
      "sodienthoaitaixe": "Số Điện Thoại Tài Xế",
      "biensoxe": "Biển Số Xe",
      "socho": "Số Chổ",
      "chonxengaydi": "Chọn Xe Ngày Đi",
      "chonxengayve": "Chọn Xe Ngày Về",
      "ghichuchotaixe": "Ghi Chú Cho Tài Xế",
      "trangthaixe": "Trạng Thái Xe",
      "quanlixe": "Quản Lí Xe",
      "quanlitaixe": "Quản Lí Tài Xế",
      "xulidatxe": "Xử Lí Đặt Xe",
      "danhsachxe": "DANH SÁCH XE",
      "vitrihientai": "Vị Trí Hiện Tại",
      "hangxe": "Hãng Xe",
      "tenxe": "Tên Xe",
      "themxemoi": "Thêm Xe Mới",
      "chonbu": "Chọn BU",
      "themtaixe": "Thêm Tài Xế",
      "danhsachtaixe": "DANH SÁCH TÀI XẾ",
      "xedanglai": "Xe Đang Lái",
      "chonxe": "Chọn Xe",
      "tienganh": "Tiếng Anh",
      "tiengviet": "Tiếng Việt"
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