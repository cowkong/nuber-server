import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {ReportMovementMutationArgs, ReportMovementResponse} from "../../../types/graph";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
    Mutation: {
        ReportMovement: privateResolver(
            async (
                _,
                args: ReportMovementMutationArgs,
                {req}
            ): Promise<ReportMovementResponse> => {
                const user: User = req.user;
                const notNull =  cleanNullArgs(args);
                try{
                    console.log(args);
                    console.log(notNull);
                    await User.update({id: user.id} , {...notNull});
                    return {
                        ok: true,
                        error: null
                    }
                }catch (error){
                    return {
                        ok: false,
                        error: error.message
                    }
                }
                
            }
        )

    }
};

export default resolvers;