import router from "@/router";

export default {
    async login(context, payload) {
        let myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        let data = JSON.stringify({
            "email": payload.email,
            "password": payload.password
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        let url = payload.url + '/api/admin-login';

        const response = await fetch(url, requestOptions);
        const responseData = await response.json();

        if (!responseData.status) {
            throw new Error('Error');
        }

        localStorage.setItem('token', responseData.data.token);
        localStorage.setItem('role', responseData.data.key);

        context.commit('setUser', {
            token: responseData.data.token,
            role: responseData.data.key,
            tokenExpiration: "",
        })

    },

    tryLogin(context) {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')
        const tokenExpiration = ""

        if (token) {
            context.commit('setUser', {
                token: token,
                role: role,
                tokenExpiration: tokenExpiration,
            })
        }
    },

    logout(context) {
        context.commit('setUser', {
            token: null,
            userId: null,
            role: null,
            tokenExpiration: null,
        })

        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('role')
        localStorage.removeItem('tokenExpiration')

        router.push("/");

    }
}
