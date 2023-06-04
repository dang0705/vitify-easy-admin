import phone from '@/regexp/rules/phone';
export default (number) => phone().test(number);
