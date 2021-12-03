import store from "../store";

export default async function initWhoami(authorization, store, api, axios) {
    if (authorization) {
        try {
            const temp = await axios({
                url: api.getUser,
                headers: {
                    authorization
                },
            });
            if (temp.data.status) {
                await isUser(temp.data.data);
            } else {
                // 失败，说明authorization无效
                window.authorization = "";
            }
        } catch (error) {
            // debugger
        }
    }

}
async function isUser(user) {
    const { account, avatar, nickName, sex, desc, email } = user;
    store.commit("user/changeUser", {
        account,
        avatar,
        nickName,
        sex,
        desc,
        email,
    });
    await store.dispatch("cart/getCartList");
    await store.dispatch("order/getOrderList");
    await store.dispatch("address/getAddressList");

}