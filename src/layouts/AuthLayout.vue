<script setup lang="ts">
const containerRef = ref();

const initMutationObserver = (callback: any) => {
  const config = {
    subtree: false,
    childList: true,
  };
  const observer = new MutationObserver(callback);
  observer.observe(containerRef.value, config);
};

const handleAnimationLayout = () => {
  nextTick(() => {
    document.body.classList.remove('loaded--form');
    setTimeout(() => {
      document.body.classList.add('loaded--form');
    }, 100);
  });
};

onMounted(() => {
  initMutationObserver(handleAnimationLayout);
});
</script>

<template>
  <div id="auth-layout">
    <div class="auth h-100 mx-auto position-relative d-flex vw-100">
      <div id="form-wrap" class="flex-grow-1 auth__form position-relative" style="min-width: 50%">
        <div class="wbox shadow-3 rounded-2xl">
          <div class="wbox-inner">
            <div ref="containerRef" class="flex-grow-1 d-flex flex-column justify-content-between">
              <slot />
            </div>
          </div>
        </div>
      </div>
      <div class="d-none d-lg-flex align-items-center vh-100">
        <IStrokeLogin />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#auth-layout {
  background-color: var(--color-white);
  .auth__logo,
  .auth__form {
    opacity: 0;
    visibility: hidden;
  }
}

body {
  &.loaded #app {
    .auth__logo {
      animation: fadeInZoomRight 0.5s ease-in-out forwards;
    }
  }
  &.loaded--form #app {
    .auth__form {
      animation: fadeInLeft 0.4s ease-in-out 0.2s forwards;
    }
  }
}
</style>

<style lang="scss" scoped>
.auth {
  &__logo {
    position: absolute;
    width: 100%;
    height: 100%;

    & > img {
      position: absolute;
      left: 0;
      transform: translate(-35%, 0);
      height: calc(100% + 3rem);
      margin-top: -3rem;

      @media (max-width: 767px) {
        margin-top: 0;
        height: auto;
      }
    }
  }
  &__form {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    .wbox {
      display: flex;
      background-color: var(--el-color-white);
      padding: 1.875rem 1.25rem;
      width: 80%;
      max-width: 440px;

      @media (max-width: 1399px) {
        width: 440px;
      }
      @media (max-width: 767px) {
        min-width: auto;
        min-height: auto;
        width: 100%;
        max-width: 440px;
        margin: 0 1rem;
      }

      &-inner {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      &__top {
        margin-bottom: 5rem;
        img {
          @media (max-width: 767px) {
            width: 4rem;
          }
        }
      }
    }
  }
}
</style>
