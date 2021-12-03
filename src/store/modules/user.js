export default {
    namespaced: true,
    state: {
        account: "",
        avatar: "", //默认头像
        sex: "", //默认
        nickName: "",
        desc: "",
        email: "",
    },

    mutations: {
        changeUser(state, payload) {
            for (const item in payload) {
                state[item] = payload[item];
            }
        },
        initUser(state) {
            state.account = "";
            state.avatar = ""; //默认头像
            state.sex = ""; //默认
            state.nickName = "";
            state.desc = "";
            state.email = "";
        }

    },
    actions: {
        async getUserMsg({
            commit
        }) {
            const res = await axios.get(api.getUser);
            if (!res.data.status) {
                return;
            }
            const { account, avatar, nickName, sex, desc, email } = res.data.data;
            commit("changeUser", {
                account,
                avatar,
                nickName,
                sex,
                desc,
                email,
            });

        },
        async changePwd({ commit }, pwd) {
            const res = await axios.put(api.updatePassword, pwd);
            if (!res.data.status) {
                Toast.fail(res.data.msg);
                return;
            }
            Toast.success(res.data.msg);
        },
        async updateUserMsg({ commit }, data) {
            const res = await axios.put(api.user, data);
            if (!res.data.status) {
                Toast.fail(res.data.msg);
                return;
            }

            //success
            const {
                email: updateEmail,
                sex: updateSex,
                nickName: updateNickName,
                avatar: updateAvatar,
                desc: updateDesc,
            } = res.data.data;
            Toast.success(res.data.msg);
            //⭐先重新提交store
            commit("changeUser", {
                email: updateEmail,
                sex: updateSex,
                nickName: updateNickName,
                avatar: updateAvatar, //图片修改成功后，后端会处理图片，返回新的路径给我，而不是用上传之前的路径
                desc: updateDesc,
            });
        }

    },
    getters: {
        sex: state => state.sex ? "男" : "女",
        desc: state => {
            if (state.desc.length > 10) {
                return state.desc.slice(0, 9) + "...";
            }
            return state.desc;
        },
        // avatar: state => state.avatar || "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.17qq.com%2Fimg_qqtouxiang%2F6699809.jpeg&refer=http%3A%2F%2Fwww.17qq.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614925081&t=2cc65844b84fc2a87d674a1cf8443152"
    }
}