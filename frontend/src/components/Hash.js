import React from "react";

export function Hash({ hash, shorten, clickable, mode, className }) {
    const getAddressScannerURL = (address) => `https://mumbai.polygonscan.com/address/${address}`;
    const getTxScannerURL = (tx) => `https://mumbai.polygonscan.com/tx/${tx}`;
    const href = (mode === 'address') ? getAddressScannerURL(hash) : getTxScannerURL(hash);
    if (!shorten) {
        return <span>{hash}</span>;
    } else if (!isNaN(shorten)) {
        return (
            <>
                {
                    clickable &&
                    (mode === 'address' ?
                        <a href={href} target='_blank' rel="noreferrer" className={className}>  {hash?.slice(0, shorten + 1)} . . . {hash?.slice(-shorten)}</a> :
                        <a href={href} target='_blank' rel="noreferrer" className={className}>  {hash?.slice(0, shorten + 1)} . . . {hash?.slice(-shorten)}</a>)
                }
                {
                    !clickable &&
                    (mode === 'address' ?
                        <>  {hash?.slice(0, shorten + 1)} . . . {hash?.slice(-shorten)}</> :
                        <>  {hash?.slice(0, shorten + 1)} . . . {hash?.slice(-shorten)}</>)
                }
            </>
        );
    } else if (shorten === "dynamic") {
        return (
            /*TODO*/
            <span>{hash}</span>
        );
    }
}