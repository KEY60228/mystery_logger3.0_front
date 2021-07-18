import React, { FC, useEffect } from 'react'

declare global {
    interface Window {
        adsbygoogle?: {
            [key: string]: unknown
        }[]
    }
}

export const ReviewAdsCard: FC = () => {
    useEffect(() => {
        if (window.adsbygoogle && process.env.NODE_ENV === "production") {
            window.adsbygoogle.push({})
        }
    }, [])

    return (
        <ins
            className="adsbygoogle"
            style={{ "display": "block" }}
            data-ad-format="fluid"
            data-ad-layout-key="-gw-3+1f-3d+2z"
            data-ad-client={process.env.DATA_AD_CLIENT}
            data-ad-slot="8276327418"
            data-full-width-responsive="true"
        ></ins>
    )
}
