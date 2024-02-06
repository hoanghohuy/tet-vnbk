'use client';
import React, { useState } from 'react';
import Slider from 'react-slick';
import { tourMienBac, tourMienNam, tourMienTrung, tourTuDN, tourTuHCM, tourTuHN } from '@/components/js/dataTour';
import '@/components/css/desktop/tet.css';
import '@/components/css/animate.min.css';
import '@/components/css/custom/common/fonts-custom.css';
import '@/components/css/desktop/tet.css';
import Swal from 'sweetalert2';
import { handleBookTour } from '@/utils/firebase';

const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

export default function Home() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('Hà Nội');
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async () => {
        if (name.length < 3) {
            Swal.fire({
                title: 'Họ và tên của bạn không hợp lệ! Vui lòng kiểm tra lại.',
                confirmButtonText: '<img class="tet-popup-xacnhan-btn" src="/images/popup_xacnhan.png" />',
                customClass: {
                    confirmButton: 'tet-custom-confirm',
                    title: 'tet-custom-popup-title',
                    htmlContainer: 'tet-custom-popup-text',
                    popup: 'tet-custom-notify-container',
                },
            });
            return;
        }

        if (phone.length < 6 || phone.length > 12) {
            Swal.fire({
                title: 'Số điện thoại của bạn không hợp lệ! Vui lòng kiểm tra lại.',
                confirmButtonText: '<img class="tet-popup-xacnhan-btn" src="/images/popup_xacnhan.png" />',
                customClass: {
                    confirmButton: 'tet-custom-confirm',
                    title: 'tet-custom-popup-title',
                    htmlContainer: 'tet-custom-popup-text',
                    popup: 'tet-custom-notify-container',
                },
            });
            return;
        }
        setDisabled(true);
        try {
            const sendMail = await fetch('/api/contacts', {
                method: 'POST',
                body: JSON.stringify({ name, phone, city }),
            });
            if (sendMail.status == 200) {
                Swal.fire({
                    title: 'Cám ơn quý khách đã quan tâm tới dịch vụ của vietnam booking',
                    text: 'Thông tin đã được ghi nhận. Chúng tôi sẽ liên hệ lại Quý khách trong thời gian sớm nhất.',
                    confirmButtonText: '<img class="tet-popup-xacnhan-btn" src="/images/popup_xacnhan.png" />',
                    customClass: {
                        confirmButton: 'tet-custom-confirm',
                        title: 'tet-custom-popup-title',
                        htmlContainer: 'tet-custom-popup-text',
                        popup: 'tet-custom-popup-container',
                    },
                });
            } else {
                Swal.fire({
                    title: 'Đã có lỗi xảy ra! Vui lòng thử lại sau ít phút.',
                    confirmButtonText: '<img class="tet-popup-xacnhan-btn" src="/images/popup_xacnhan.png" />',
                    customClass: {
                        confirmButton: 'tet-custom-confirm',
                        title: 'tet-custom-popup-title',
                        htmlContainer: 'tet-custom-popup-text',
                        popup: 'tet-custom-notify-container',
                    },
                });
            }
        } catch (error) {
            setDisabled(false);
            throw error;
        }
    };

    return (
        <div class="tet-container">
            <img class="tet-mask-top-left" src="../../images/hoa_mai_left.png" />
            <img class="tet-mask-top-right" src="../../images/hoa_mai_right.png" />
            <img class="tet-mask-bot-left" src="../../images/hoa_bot_left.png" />
            <img class="tet-mask-bot-right" src="../../images/hoa_bot_right.png" />

            <div class="tet-header">
                <img class="tet-header-logo" src="/images/footer_logo.png" />
                <img class="tet-header-text" src="/images/footer_text.png" />
            </div>
            <div class="tet-banner">
                <img class="tet-banner-image" src="/images/banner.png" />
                <div class="tet-banner-text">
                    Tết là dịp đoàn viên, đồng thời cũng là dịp nạp năng lượng cho một năm mới tràn đầy phấn khởi. Và
                    những chuyến du xuân chính là sự khởi động hoàn hảo, mở ra một hành trình mới thật nhiều niềm vui và
                    hạnh phúc.
                    <br />
                    <br />
                    Hãy chọn cho mình một lịch trình tour độc đáo, hấp dẫn với sự đồng hành của Vietnam Booking - Nhà tổ
                    chức Tour chuyên nghiệp và uy tín. Gọi ngay Hotline{' '}
                    <a class="tet-banner-tel" href="tel:19003398">
                        1900 3398
                    </a>{' '}
                    để được tư vấn đặt tour và nhận "lì xì" lên đến 30% ngay hôm nay bạn nhé!
                </div>
            </div>

            <div class="tet-tour tour-trongnuoc">
                <img class="tour-trongnuoc-mask" src="/images/tour/en_right.png" />
                <div class="tour-header">
                    <img class="tour-header-img" src="/images/tour/header_trongnuoc.png" />
                </div>
                <div class="tour-main">
                    <ul class="nav nav-tabs nav-justified tet-custom-nav-tab">
                        <li class="active">
                            <a href="#mienbac" data-toggle="tab">
                                <img class="tour-tab-img" src="/images/tour/trongnuoc/mienbac.png" />
                            </a>
                        </li>
                        <li class="#">
                            <a href="#mientrung" data-toggle="tab">
                                <img class="tour-tab-img" src="/images/tour/trongnuoc/mientrung.png" />
                            </a>
                        </li>
                        <li class="#">
                            <a href="#miennam" data-toggle="tab">
                                <img class="tour-tab-img" src="/images/tour/trongnuoc/miennam.png" />
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div class="tab-pane active" id="mienbac">
                            <div class="tet-tour-list-content">
                                {/* <!-- ITEM FOREACH --> */}
                                {tourMienBac &&
                                    tourMienBac.map((item, index) => (
                                        <div class="tet-tour-item">
                                            <img class="tet-tour-item-mask" src="/images/tour/tour_mask.png" />
                                            <img
                                                class="tet-tour-item-img"
                                                src={`/images/tour-images/noi_dia/mien_bac/${item.id}.jpg`}
                                            />
                                            <h3 class="tet-tour-item-name">{item.name}</h3>
                                            <div class="tet-tour-item-price">{item.price} VNĐ</div>
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                class="tet-tour-item-order"
                                                onClick={() => handleBookTour(item)}
                                            >
                                                Đặt tour
                                            </a>
                                        </div>
                                    ))}

                                {/* <!-- ITEM FOREACH --> */}
                            </div>
                        </div>

                        {/* <!-- TAB PANE FOR MIEN MIEN TRUNG --> */}
                        <div class="tab-pane" id="mientrung">
                            <div class="tet-tour-list-content">
                                {tourMienTrung &&
                                    tourMienTrung.map((item, index) => (
                                        <div class="tet-tour-item">
                                            <img class="tet-tour-item-mask" src="/images/tour/tour_mask.png" />
                                            <img
                                                class="tet-tour-item-img"
                                                src={`/images/tour-images/noi_dia/mien_trung/${item.id}.jpg`}
                                            />
                                            <h3 class="tet-tour-item-name">{item.name}</h3>
                                            <div class="tet-tour-item-price">{item.price} VNĐ</div>
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                class="tet-tour-item-order"
                                                onClick={() => handleBookTour(item)}
                                            >
                                                Đặt tour
                                            </a>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* <!-- TAB PANE FOR MIEN NAM --> */}
                        <div class="tab-pane" id="miennam">
                            <div class="tet-tour-list-content">
                                {tourMienNam &&
                                    tourMienNam.map((item, index) => (
                                        <div class="tet-tour-item">
                                            <img class="tet-tour-item-mask" src="/images/tour/tour_mask.png" />
                                            <img
                                                class="tet-tour-item-img"
                                                src={`/images/tour-images/noi_dia/mien_nam/${item.id}.jpg`}
                                            />
                                            <h3 class="tet-tour-item-name">{item.name}</h3>
                                            <div class="tet-tour-item-price">{item.price} VNĐ</div>
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                class="tet-tour-item-order"
                                                onClick={() => handleBookTour(item)}
                                            >
                                                Đặt tour
                                            </a>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- END TOUR TRONG NUOC --> */}

            {/* <!-- TOUR QUOC TE --> */}
            <div class="tet-tour tour-quocte">
                <img class="tour-quocte-mask" src="/images/tour/en_left.png" />
                <div class="tour-header">
                    <img class="tour-header-img" src="/images/tour/header_quocte.png" />
                </div>
                <div class="tour-main">
                    <ul class="nav nav-tabs nav-justified tet-custom-nav-tab">
                        <li class="active">
                            <a href="#start_hanoi" data-toggle="tab">
                                <img class="tour-tab-img" src="/images/tour/quocte/xuatphat_hanoi.png" />
                            </a>
                        </li>
                        <li class="#">
                            <a href="#start_danang" data-toggle="tab">
                                <img class="tour-tab-img" src="/images/tour/quocte/xuatphat_danang.png" />
                            </a>
                        </li>
                        <li class="#">
                            <a href="#start_hcm" data-toggle="tab">
                                <img class="tour-tab-img" src="/images/tour/quocte/xuatphat_hcm.png" />
                            </a>
                        </li>
                    </ul>
                    {/* <!-- TAB CONTENT FOR HANOI --> */}
                    <div class="tab-content">
                        <div class="tab-pane active" id="start_hanoi">
                            <div class="tet-tour-list-content">
                                {tourTuHN &&
                                    tourTuHN.map((item, index) => (
                                        <div class="tet-tour-item">
                                            <img class="tet-tour-item-mask" src="/images/tour/tour_mask.png" />
                                            <img
                                                class="tet-tour-item-img"
                                                src={`/images/tour-images/quoc_te/ha_noi/${item.id}.jpg`}
                                            />
                                            <h3 class="tet-tour-item-name">{item.name}</h3>
                                            <div class="tet-tour-item-price">{item.price} VNĐ</div>
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                class="tet-tour-item-order"
                                                onClick={() => handleBookTour(item)}
                                            >
                                                Đặt tour
                                            </a>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* <!-- TAB CONTENT FOR DA NANG --> */}
                        <div class="tab-pane" id="start_danang">
                            <div class="tet-tour-list-content">
                                {tourTuDN &&
                                    tourTuDN.map((item, index) => (
                                        <div class="tet-tour-item">
                                            <img class="tet-tour-item-mask" src="/images/tour/tour_mask.png" />
                                            <img
                                                class="tet-tour-item-img"
                                                src={`/images/tour-images/quoc_te/da_nang/${item.id}.jpg`}
                                            />
                                            <h3 class="tet-tour-item-name">{item.name}</h3>
                                            <div class="tet-tour-item-price">{item.price} VNĐ</div>
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                class="tet-tour-item-order"
                                                onClick={() => handleBookTour(item)}
                                            >
                                                Đặt tour
                                            </a>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* <!-- TAB CONTENT FOR HO CHI MINH --> */}
                        <div class="tab-pane" id="start_hcm">
                            <div class="tet-tour-list-content">
                                {tourTuHCM &&
                                    tourTuHCM.map((item, index) => (
                                        <div class="tet-tour-item">
                                            <img class="tet-tour-item-mask" src="/images/tour/tour_mask.png" />
                                            <img
                                                class="tet-tour-item-img"
                                                src={`/images/tour-images/quoc_te/hcm/${item.id}.jpg`}
                                            />
                                            <h3 class="tet-tour-item-name">{item.name}</h3>
                                            <div class="tet-tour-item-price">{item.price} VNĐ</div>
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                class="tet-tour-item-order"
                                                onClick={() => handleBookTour(item)}
                                            >
                                                Đặt tour
                                            </a>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- END TOUR QUOC TE --> */}

            {/* <!-- TET CAM ON SLIDER --> */}
            <div class="tet-thanks">
                <div class="tet-thanks-text">
                    <div class="tet-thanks-title">Trân trọng cảm ơn quý khách</div>
                    <div class="tet-thanks-desc">Đã tin tưởng lựa chọn Vietnam Booking trong mỗi hành trình.</div>
                </div>
                <Slider {...settings} className="tet-thanks-slider">
                    {/* <div class="slider-image-item">
                        <img src="/images/thanks.png" />
                    </div>
                    <div class="slider-image-item">
                        <img src="/images/thanks.png" />
                    </div>
                    <div class="slider-image-item">
                        <img src="/images/thanks.png" />
                    </div>
                    <div class="slider-image-item">
                        <img src="/images/thanks.png" />
                    </div>
                    <div class="slider-image-item">
                        <img src="/images/thanks.png" />
                    </div> */}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => (
                        <div class="slider-image-item">
                            <img src={`/images/slider/${item}.png`} />
                        </div>
                    ))}
                </Slider>

                {/* <div class="tet-thanks-slider">
                <div class="owl-carousel owl-theme">
                    
                </div>
            </div> */}
            </div>
            {/* <!-- TET LIEN HE DAT TOUR --> */}
            {/* <div class="tet-contact">
            <img class="tet-contact-banner" src="/images/contact_banner.png" />
            <div class="tet-contact-form">
                <div class="tet-contact-header">
                    <img class="tet-contact-img" src="/images/tet-dong-day.png" />
                    <form action="#" method="POST" class="tet-form-container">
                        <div class="tet-form-title">Đặt tour ngay hôm nay</div>
                        <div class="tet-form-list">
                            <input required placeholder="Họ tên của bạn" id="full_name" class="tet-form-input" />
                            <input required placeholder="Số điện thoại" id="full_name" class="tet-form-input" />
                            <select name="destination" id="destination" class="tet-form-destination">
                                <option value="ha_noi">Hà Nội</option>
                                <option value="da_nang">Đà Nẵng</option>
                                <option value="hcm">TP. Hồ Chí Minh</option>
                            </select>
                        </div>
                        <button class="tet-form-submit" type="submit">
                            <img class="tet-form-submit-img" src="/images/dang-ky.png" />
                        </button>
                    </form>
                </div>
            </div>
        </div> */}

            <div class="tet-contact">
                <img class="tet-contact-banner" src="/images/contact_banner.png" />
                <div class="tet-contact-form">
                    <div class="tet-contact-header">
                        <img class="tet-contact-img" src="/images/tet-dong-day.png" />
                        <div class="tet-form-container">
                            <div class="tet-form-title">Đặt tour ngay hôm nay</div>
                            <div class="tet-form-list">
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Họ tên của bạn"
                                    id="full_name"
                                    class="tet-form-input"
                                />
                                <input
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="number"
                                    placeholder="Số điện thoại"
                                    id="full_name"
                                    class="tet-form-input tet-form-number"
                                />
                                <select
                                    onChange={(e) => setCity(e.target.value)}
                                    name="destination"
                                    id="destination"
                                    class="tet-form-destination"
                                >
                                    <option value="Hà Nội">Hà Nội</option>
                                    <option value="Đà Nẵng">Đà Nẵng</option>
                                    <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                                </select>
                            </div>
                            <button disabled={disabled} class="tet-form-submit" type="submit">
                                <img onClick={handleSubmit} class="tet-form-submit-img" src="/images/dang-ky.png" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- TET FOOTER --> */}
            <div class="tet-footer">
                <div class="tet-footer-top">
                    <div class="tet-top-container">
                        <img class="tet-top-logo-img" src="/images/footer_logo.png" />
                        <img class="tet-top-text-img" src="/images/footer_text.png" />
                    </div>
                </div>
                <div class="tet-footer-bottom">
                    <img class="tet-footer-mask" src="/images/footer_mask.png" />
                    <div class="tet-bottom-container">
                        <div class="tet-buttom-wrapper">
                            <img class="footer-qr" src="/images/footer_qr.png" />
                            <div class="footer-info-container">
                                <div class="footer-info">
                                    <div class="footer-info-svg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 32 32"
                                            fill="none"
                                        >
                                            <path
                                                d="M21.7455 9.43635C20.6201 4.07603 18.2199 0.684808 16 0.684808C13.7801 0.684808 11.3799 4.07603 10.2545 9.43635H21.7455ZM9.59955 16C9.59929 17.4635 9.69444 18.9253 9.88437 20.3758H22.1156C22.3056 18.9253 22.4007 17.4635 22.4004 16C22.4007 14.5365 22.3056 13.0747 22.1156 11.6242H9.88437C9.69444 13.0747 9.59929 14.5365 9.59955 16ZM10.2545 22.5637C11.3799 27.924 13.7801 31.3152 16 31.3152C18.2199 31.3152 20.6201 27.924 21.7455 22.5637H10.2545ZM23.9302 9.43635H30.6506C29.6409 7.07974 28.1066 4.9986 26.1709 3.35987C24.2352 1.72113 21.9519 0.570409 19.5042 0C21.5279 1.82579 23.1152 5.2017 23.9302 9.43635ZM31.4176 11.6242H24.2704C24.4464 13.0758 24.5344 14.5372 24.5339 16C24.5341 17.4628 24.4457 18.9242 24.2694 20.3758H31.4165C32.1945 17.5131 32.1955 14.4869 31.4176 11.6242ZM19.5042 32C21.9523 31.4299 24.236 30.2793 26.1721 28.6406C28.1082 27.0018 29.6428 24.9205 30.6528 22.5637H23.9323C23.1152 26.7983 21.5279 30.1742 19.5042 32ZM8.06985 22.5637H1.34938C2.35936 24.9205 3.89395 27.0018 5.83005 28.6406C7.76614 30.2793 10.0498 31.4299 12.4979 32C10.4721 30.1742 8.88484 26.7983 8.06985 22.5637ZM12.4958 0C10.0477 0.5701 7.764 1.72068 5.82791 3.35943C3.89182 4.99818 2.35722 7.07948 1.34724 9.43635H8.06771C8.88484 5.2017 10.4721 1.82579 12.4958 0ZM7.46607 16C7.46593 14.5372 7.55429 13.0758 7.73062 11.6242H0.583456C-0.194485 14.4869 -0.194485 17.5131 0.583456 20.3758H7.73062C7.55429 18.9242 7.46593 17.4628 7.46607 16Z"
                                                fill="#FEFEFF"
                                            />
                                        </svg>
                                    </div>
                                    <a href="https://www.vietnambooking.com" class="footer-info-text">
                                        www.vietnambooking.com
                                    </a>
                                </div>
                                <div class="footer-info">
                                    <div class="footer-info-svg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="26"
                                            viewBox="0 0 32 26"
                                            fill="none"
                                        >
                                            <path
                                                d="M3.07136 8.17867C3.47616 8.46431 4.69636 9.31268 6.73203 10.7233C8.76776 12.134 10.3273 13.2202 11.4106 13.9819C11.5296 14.0654 11.7825 14.2469 12.1694 14.5267C12.5563 14.8066 12.8778 15.0328 13.1336 15.2054C13.3896 15.3779 13.699 15.5714 14.0623 15.7856C14.4254 15.9997 14.7678 16.1607 15.0892 16.2672C15.4107 16.3747 15.7083 16.4279 15.982 16.4279H16.018C16.2917 16.4279 16.5895 16.3746 16.9109 16.2672C17.2322 16.1607 17.5749 15.9995 17.9377 15.7856C18.3007 15.5712 18.6102 15.3779 18.8662 15.2054C19.1222 15.0328 19.4434 14.8066 19.8304 14.5267C20.2172 14.2467 20.4704 14.0654 20.5894 13.9819C21.6845 13.2202 24.4704 11.2856 28.9465 8.17829C29.8155 7.57141 30.5415 6.83913 31.1247 5.98194C31.7084 5.12513 31.9999 4.22629 31.9999 3.28592C31.9999 2.50009 31.717 1.82742 31.1515 1.26795C30.586 0.708352 29.9163 0.428711 29.1427 0.428711H2.85702C1.94041 0.428711 1.23502 0.738186 0.740977 1.35714C0.246992 1.97621 0 2.75003 0 3.67852C0 4.4285 0.327489 5.24122 0.982153 6.11617C1.63675 6.99118 2.33339 7.67874 3.07136 8.17867Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M30.214 10.0892C26.3097 12.7318 23.345 14.7855 21.3215 16.25C20.6429 16.7498 20.0924 17.1399 19.6697 17.4195C19.247 17.6993 18.6847 17.985 17.9822 18.2765C17.28 18.5685 16.6255 18.714 16.0182 18.714H15.9821C15.3749 18.714 14.7201 18.5685 14.0178 18.2765C13.3156 17.985 12.753 17.6993 12.3304 17.4195C11.9079 17.1399 11.3572 16.7498 10.6787 16.25C9.07148 15.0715 6.1132 13.0176 1.80375 10.0892C1.12501 9.63707 0.523819 9.11888 0 8.53564V22.7138C0 23.5 0.279641 24.1723 0.839236 24.7318C1.39871 25.2915 2.07145 25.5713 2.85721 25.5713H29.143C29.9286 25.5713 30.6012 25.2915 31.1608 24.7318C31.7205 24.1721 32 23.5 32 22.7138V8.53564C31.488 9.10681 30.8929 9.625 30.214 10.0892Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </div>
                                    <a href="mailto:dulich@vietnambooking.com" class="footer-info-text">
                                        dulich@vietnambooking.com
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="tet-info-right">
                            <div class="tet-info-company">dịch vụ lữ hành vietnam booking</div>
                            <div class="tet-footer-divider"></div>
                            <div>
                                <div class="tet-tongdai-text">tổng đài tư vấn</div>
                                <a href="tel:1900 3398" class="tet-tongdai-num">
                                    1900 3398
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
