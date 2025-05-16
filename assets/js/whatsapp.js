document.addEventListener('DOMContentLoaded', function () {
    const whatsappBtn = document.getElementById('whatsappBtn');

    // Predefined message with line breaks and bold+italic formatting
    const message = `Hello Codenza Team!

I'm interested in your web design services and would like to discuss:

* *Service Needed:* _[Starter/Pro/Premium]_
* *Project Details:* _[Brief description]_
* *Budget:* _[Your budget range]_
* *Timeline:* _[When you need it]_

Please send me more information. Thank you!`;

    whatsappBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = '96176310332';

        // Open WhatsApp with the predefined message
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        console.log('WhatsApp button clicked with predefined message');
    });

    // Optional: Hide/show on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            whatsappBtn.style.transform = 'translateY(0)';
            return;
        }

        if (currentScroll > lastScroll) {
            whatsappBtn.style.transform = 'translateY(100px)';
        } else {
            whatsappBtn.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
});
