import React from 'react';

import {footerLinks} from '../constants';

export function Footer() {
    return (
        <footer className="footer">
            <div>
                <div className="footer_cover"/>
                <div className="footer_nav">
                    <p>Copyright @ 2024 ViktorBed. All rights reserved.</p>
                    <div>
                        {footerLinks.map((link, i) => (
                            <p key={link} className="link">
                                {link}{' '}
                                {i !== footerLinks.length - 1 && (
                                    <span> | </span>
                                )}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
