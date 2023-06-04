import email from '@/regexp/rules/email';
export default (address) => email().test(address);
