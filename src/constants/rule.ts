export const RULE_EMAIL = {
  type: 'email',
  message: 'Email chưa hợp lệ',
};

const checkPhone = (rule, value, callback) => {
  if (value && (!/^([0-9()/+ -]*)$/.test(value) || value?.length < 7)) {
    return callback(new Error('Số điện thoại phải hợp lệ, có ít nhất 7 ký tự'));
  }

  return callback();
};

export const RULE_REQUIRED = {
  required: true,
  message: 'Vui lòng nhập trường này',
};

export const RULE_REQUIRED_SELECT = {
  required: true,
  message: 'Vui lòng nhập trường này',
  trigger: 'blur',
};

export const RULE_PASSWORD = {
  pattern: RX_PASSWORD,
  message: 'Mật khẩu phải có ít nhất 6 ký tự, bao gồm ít nhất 1 ký tự chữ và 1 ký tự số',
};

export const RULE_PHONE = {
  validator: checkPhone,
};

export const RULE_PHONE_REQUIRED = [RULE_REQUIRED, RULE_PHONE];

export const RULE_PASSWORD_REQUIRED = [RULE_REQUIRED, RULE_PASSWORD];

export const RULE_EMAIL_REQUIRED = [RULE_REQUIRED, RULE_EMAIL];

export const RULE_MAX_LENGTH = {
  max: STRING_MAX_LENGTH,
  message: `Trường không được nhập quá ${STRING_MAX_LENGTH} ký tự`,
};
