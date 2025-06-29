export interface TruckObject{
    id : string,
    driver: string,
    status: string,
    location: {
        city: string,
        lat?: string,
        lng?: string
    },
    truckImage?: string,
    route?: Array<{
        city: string,
        lat?: string,
        lng?: string
    }>,
    currentRouteIndex?: number
}

export interface HeroData{
    image: any,
    txt1?:  string,
    txt2?: string
}




