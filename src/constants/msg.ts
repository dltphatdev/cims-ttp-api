const MSG = {
  VALIDATION_ERR: 'Validate error',
  EMAIL_IS_REQUIRED: 'Email là bắt buộc',
  EMAIL_MUST_BE_STRING: 'Email phải là dạng chuỗi ký tự',
  EMAIL_LENGTH: 'Email có độ dài từ 5 đến 160 ký tự',
  EMAIL_INVALID: 'Email chưa đúng định dạng',
  PASSWORD_IS_REQUIRED: 'Mật khẩu là bắt buộc',
  PASSWORD_LENGTH: 'Mật khẩu có độ dài từ 6 đến 160 ký tự',
  PASSWORD_IS_NOT_STRONG: 'Mật khẩu chưa đủ bảo mật',
  EMAIL_OR_PASSWORD_INCORRECT: 'Email hoặc mật khẩu chưa chính xác',
  LOGIN_SUCCESS: 'Đăng nhập tài khoản thành công',
  LOGOUT_SUCCESS: 'Đăng xuất tài khoản thành công',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token là bắt buộc',
  TOKEN_NOT_FOUND: 'Không tìm thấy token',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token là bắt buộc',
  CREATED_USER_SUCCESS: 'Tạo tài khoản thành công',
  VERIFY_USER_INVALID: 'Tài khoản chưa được xác thực'
} as const

export default MSG
