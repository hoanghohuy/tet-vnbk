import { NextResponse } from 'next/server';
const nodemailer = require('nodemailer');

export const POST = async (request) => {
    const {name, phone, city} = await request.json();
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.USER_MAILER,
                pass: process.env.PASSWORD_MAILER,
            },
        });
        await transporter.sendMail({
            from: 'Customer',
            to: process.env.EMAIL_RECIEVER,
            subject: '[TẾT VIETNAMBOOKING] - LIÊN HỆ ĐẶT TOUR',
            html: `
                <div>Tên khách hàng: <strong>${name}</strong></div>
                <div>Số điện thoại: <strong>${phone}</strong></div>
                <div>Địa điểm: <strong>${city}</strong></div>
            `,
        });
        return NextResponse.json({ success: 'Liên hệ đặt tour thành công!' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Lỗi hệ thống!' }, { status: 500 });
    }
};
