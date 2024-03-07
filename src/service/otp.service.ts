import { DataSourceConfig } from '../config/typeORMConfig';
import { Otp } from '../models/otp.entity';
// Generate random OTP
const generateOTP = (): string => {
  return Math.random().toString().slice(2, 8); // 6-digit OTP
};

//Store Otp
const storeOtp = async (email:string,otp:string,expiry:Date) =>{
    const otpRepository = DataSourceConfig.getRepository(Otp);
    const newOtp = otpRepository.create({ email, otp, expiry });
    await otpRepository.save(newOtp);
}

export {generateOTP,storeOtp};
