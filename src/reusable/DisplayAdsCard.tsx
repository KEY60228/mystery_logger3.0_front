import React, { FC, useEffect } from 'react'

declare global {
    interface Window {
        adsbygoogle?: {
            [key: string]: unknown
        }[]
    }
}

export const DisplayAdsCard: FC = () => {
    useEffect(() => {
        if (window.adsbygoogle && process.env.NODE_ENV === "production") {
            window.adsbygoogle.push({})
        }
    }, [])

    return (
        <ins
            className="adsbygoogle"
            style={{ "display": "block" }}
            data-ad-client={process.env.DATA_AD_CLIENT}
            data-ad-slot="5605932049"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    )
}
