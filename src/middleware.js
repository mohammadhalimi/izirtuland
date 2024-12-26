import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    // بررسی مسیر /signup
    if (pathname === '/signup') {
        const authCookie = request.cookies.get('user-token');
        const authToken = authCookie ? authCookie.value : null;

        if (authToken && typeof authToken === 'string') {
            try {
                const { payload } = await jwtVerify(authToken, new TextEncoder().encode(process.env.JWT_SECRET));
                // هدایت کاربر به صفحه پروفایل اگر قبلاً لاگین کرده است
                const receptor = payload.receptor;
                return NextResponse.redirect(new URL(`/userpanel/${receptor}`, request.url));
            } catch (err) {
                console.log('Invalid or expired token:', err);
            }
        }
    }

    // مسیر /admin
    if (pathname.startsWith('/admin')) {
        const authCookie = request.cookies.get('auth-token');
        // اگر کاربر احراز هویت نشده باشد، به صفحه اصلی ریدایرکت می‌شود
        if (!authCookie) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // مسیر /userpanel
    if (pathname.startsWith('/userpanel')) {
        const authCookie = request.cookies.get('user-token');
        const authToken = authCookie ? authCookie.value : null;

        if (!authToken || typeof authToken !== 'string') {
            console.log('Invalid or missing authCookie');
            return NextResponse.redirect(new URL('/signup', request.url));
        }

        try {
            const { payload } = await jwtVerify(authToken, new TextEncoder().encode(process.env.JWT_SECRET));
            const receptorInUrl = pathname.split('/')[2];

            if (payload.receptor !== receptorInUrl) {
                console.log('Mismatch between JWT receptor and URL receptor');
                return NextResponse.redirect(new URL('/signup', request.url));
            }
        } catch (err) {
            console.log(err);
            return NextResponse.redirect(new URL('/signup', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/userpanel/:path*', '/admin/:path*', '/signup'],
};
