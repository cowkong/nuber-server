import { Resolvers } from "../../../types/resolvers";
import { 
    StartPhoneVerificationMutationArgs,
    StartPhoneVerificationResponse
} from "../../../types/graph";
import Verification from "../../../entities/Verification";
import { sendVerificationSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
    Mutation: {
        StartPhoneVerification: async (
            _,
            args: StartPhoneVerificationMutationArgs
            ): Promise<StartPhoneVerificationResponse>  => {
                try {
                    const { phoneNumber } = args;
                    const existingVerfification = await Verification.findOne({ payload: phoneNumber });
                    if(existingVerfification){
                        existingVerfification.remove();
                    }
                    const newVerification = await Verification.create({
                        payload: phoneNumber,
                        target: "PHONE"
                    }).save();
                    await sendVerificationSMS(newVerification.payload, newVerification.key)
                    return {
                        ok: true,
                        error: null
                    }
                }catch(error){
                    return {
                        ok: false,
                        error: error.message
                    }
                }
            }
    }
};

export default resolvers;