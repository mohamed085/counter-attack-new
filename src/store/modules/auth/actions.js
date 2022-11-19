import router from "@/router";

export default {
    async login(context, payload) {
        if (payload.email === 'team217583no68@counter_attack.com' || payload.email === 'samar@gmail.com' || payload.email === 'agency14739876@counter_attack.com') {
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

            let name = "";

            if (responseData.data.key === 'organization_agency')
                name = responseData.data.information.head_name;

            if (responseData.data.key === 'organization_agency')
                name = responseData.data.information.head_name;


            localStorage.setItem('token', responseData.data.token);
            localStorage.setItem('role', responseData.data.key);
            localStorage.setItem('name', responseData.data.key);
            localStorage.setItem('x', 1);

            context.commit('setUser', {
                token: responseData.data.token,
                role: responseData.data.key,
                tokenExpiration: "",
                name: name,
            })

        }
    },

    tryLogin(context) {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')
        const name = localStorage.getItem('name')

        let x = localStorage.getItem('x')
        localStorage.setItem('x', x + 1);
        // if (x === '11111') {
        //     this.logout();
        // }

        const tokenExpiration = ""

        if (token) {
            context.commit('setUser', {
                token: token,
                role: role,
                name: name,
                tokenExpiration: tokenExpiration,
            })
        }
    },

    logout(context) {
        context.commit('setUser', {
            token: null,
            name: null,
            role: null,
            tokenExpiration: null,
        })

        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('role')
        localStorage.removeItem('tokenExpiration')

        router.push("/login");

    }
}
