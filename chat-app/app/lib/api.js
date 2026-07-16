const API = "http://localhost:4000";

export async function apiFetch(path, options={}){
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}${path}`, {
        ...options,headers:{
            "Content-Type":"application/json",
            ...(token?{Authorization:`Bearer${token}`}:{}),
            ...options.headers,
        },
    });
    const data = await res.json();
    if(!res.ok) throw new Error(data.error||"request failed nigboy");
    return data;
}