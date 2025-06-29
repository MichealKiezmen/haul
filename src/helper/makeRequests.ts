export const fetchData = async (url: string, noHeader: boolean = false) => {
    try {
        const fetchObject : any = {
            method : "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }

        if(noHeader){
            delete fetchObject.headers
        }

        const request = await fetch(url, fetchObject)
        const response = await request.json()

        if(request.ok){
            return response
        }else{
            throw new Error(response?.error || response?.message || "Failed to fetch data")
        }
    } catch (error) {
        console.log("Network Error", error)
        return error
    }


}