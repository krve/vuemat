<script>
    var template = `<div class="md-ink-ripple">
<div class="md-ripple"></div></div>
`;

    export default {
        inserted(el) {
            el.innerHTML += template;
            el.classList.add('has-ripple');

            var rippler = el.querySelector('.md-ripple');

            el.addEventListener('click', e => {
                var elWidth = el.offsetWidth,
                    elHeight = el.offsetHeight;
                var rippleSize = ((elWidth < elHeight) ? elHeight : elWidth);

                rippler.classList.remove('active');

                setTimeout(() => {
                    rippler.style.width = rippleSize + 'px';
                    rippler.style.height = rippleSize + 'px';
                    rippler.style.left = e.layerX - rippleSize / 2 + 'px';
                    rippler.style.top = e.layerY - rippleSize / 2 + 'px';
                    rippler.classList.add('active');
                }, 10);
            });
        }
    }
</script>
