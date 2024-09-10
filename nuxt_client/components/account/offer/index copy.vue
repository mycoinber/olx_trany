<script setup>
  import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
  const { $axios } = useNuxtApp();
  const config = useRuntimeConfig();

  const queryClient = useQueryClient();

  const props = defineProps({
    offer: {
      type: Object,
      default: () => ({}),
    },
  });

  const formattedDate = computed(() => {
    const date = new Date(props.offer.createdAt);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  const baseURL = process.server
    ? "http://odito_back:3000"
    : config.public.backHost;

  const handleDeactivate = async () => {
    if (
      confirm(
        props.offer.active
          ? "Are you sure you want to deactivate this offer?"
          : "Are you sure you want to activate this offer?"
      )
    ) {
      deactivateOffer(props.offer._id);
    }
  };

  const offerDeactivate = async (data) => {
    const response = await $axios.patch(`/offer/${data}`, {
      active: !props.offer.active,
    });

    return response.data;
  };

  const { mutate: deactivateOffer } = useMutation({
    mutationFn: offerDeactivate,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
    onError: (error) => {
      console.error("Error deleting offer:", error);
    },
  });

  const handleDelete = async (data) => {
    if (confirm("Are you sure you want to delete this offer?")) {
      deleteOffer(data);
    }
  };

  const offerDelete = async (data) => {
    const response = await $axios.delete(`/offer/${data}`);

    return response.data;
  };

  const {
    mutate: deleteOffer,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation({
    mutationFn: offerDelete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
    onError: (error) => {
      console.error("Error deleting offer:", error);
    },
  });
</script>

<template>
  <div>
    <div class="wrapper">
      <div class="row">
        <div class="photo">
          <div
            class="badge"
            :class="
              props.offer.status === 'Live' ? 'badge--active' : 'badge--draft'
            "
          >
            {{ props.offer.status }}
          </div>
          <NuxtImg
            :src="
              baseURL + '/resized/thumbnail_' + props.offer.media[0].filename
            "
            :alt="props.offer.title"
          />
        </div>
        <div class="details">
          <div class="line row">
            <div class="title">
              <div class="headline">{{ props.offer.title }}</div>
              <div class="type">
                {{ props.offer.category || "" }} . {{ props.offer.typeOfHouse }}
              </div>
            </div>
            <div class="price">
              {{ props.offer.salePrice }}.00 {{ props.offer.currency }}
            </div>
          </div>
          <div class="line bottom row">
            <div class="location">
              <div>
                {{ props.offer.city.toponymName || "" }},
                {{ props.offer.city.countryName || "" }}
              </div>
              <div class="date">
                <div class="icon row">
                  <Icon name="ph:calendar" />
                </div>
                <div>
                  Created <span>{{ formattedDate }}</span>
                </div>
              </div>
            </div>
            <div class="offer-actives">
              <div class="stats">
                <div class="stat">
                  <div class="icon">
                    <Icon name="mdi:eye-outline" />
                  </div>
                  <span class="count">{{ props.offer.views || 0 }}</span>
                </div>
                <div class="stat">
                  <div class="icon">
                    <Icon name="mdi:heart-outline" />
                  </div>
                  <span class="count">{{ props.offer.likes || 0 }}</span>
                </div>
                <div class="stat">
                  <div class="icon">
                    <Icon name="lucide:phone" />
                  </div>
                  <span class="count">{{ props.offer.phoneViews || 0 }}</span>
                </div>
              </div>
              <div class="buttons">
                <button v-if="props.offer.active" class="button" disabled>
                  ADVERTISE
                </button>
                <button class="button" @click="handleDeactivate">
                  {{ !props.offer.active ? "ACTIVATE" : "DEACTIVATE" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="control">
        <div class="offerid">
          <span>Ad ID: </span>{{ props.offer.numberId || "" }}
        </div>
        <div class="offer_control">
          <NuxtLink :to="`/myaccount/offer/edit/${props.offer._id}`"
            >Edit Offer</NuxtLink
          >
          <span @click="handleDelete(props.offer._id)">Delete</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .row {
    display: flex;
    flex-direction: row;
  }

  .wrapper {
    display: flex;
    flex-direction: column;

    .photo {
      width: 15.167rem;
      height: 13.556rem;
      min-width: 15.167rem;
      position: relative;

      .badge {
        position: absolute;
        left: 0.889rem;
        top: 0.889rem;
        border-radius: 0.22rem;
        padding: 0.28rem 0.44rem;
        width: 4.5rem;
        height: 1.5rem;
        color: $white;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        font-size: 0.78rem;
        font-weight: 700;

        &--draft {
          background-color: $color-04;
        }

        &--active {
          background-color: $color-07;
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.28rem 0 0 0;
      }
    }

    .control {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0.889rem;
    }

    .details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      color: $color-02;
      padding: 0.889rem 0.889rem 0 0.889rem;

      .bottom {
        padding-bottom: 0.889rem;
        border-bottom: 1px solid #e9e6e6;
      }

      .line {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .title {
          display: flex;
          flex-direction: column;
          gap: 0.444rem;
          width: 50%;

          .headline {
            font-weight: 500;
            font-size: 1rem;
          }

          .type {
            font-size: 0.75rem;
            color: $color-05;
          }
        }
        .price {
          font-weight: 600;
        }

        .location {
          font-size: 0.78rem;
          color: $color-05;
          gap: 0.222rem;

          .date {
            color: $color-05;
            display: flex;
            flex-direction: row;
            gap: 0.333rem;
            align-items: center;

            span {
              color: $color-02;
            }
          }

          .icon {
            display: flex;
            align-items: center;

            svg {
              width: 1.2rem;
              height: 1.2rem;
              color: $color-04;
            }
          }
        }
      }

      .offer-actives {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.889rem;

        .stats {
          display: flex;
          gap: 1rem;
          flex-direction: row;

          .stat {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            flex-direction: row;

            .icon {
              svg {
                width: 1.2rem;
                height: 1.2rem;
                color: $color-04;
              }
            }

            .count {
              font-size: 0.875rem;
              color: #666;
            }
          }
        }

        .buttons {
          display: flex;
          gap: 1rem;

          .button {
            font-size: 0.78rem;
            border-radius: 0.28rem;
            padding: 0.89rem 1.78rem;
            width: 7.22rem;
            height: 2.11rem;
            cursor: pointer;
            background-color: $color-04;
            display: flex;
            color: $white;
            justify-content: center;
            align-items: center;

            &:hover {
              background-color: darken($color-04, 10%);
              color: lighten($color-01, 20%);
            }
          }
        }
      }
    }
  }

  .control {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .offerid {
      font-size: 0.78rem;

      span {
        color: $color-05;
      }
    }
  }

  .offer_control {
    display: flex;
    flex-direction: row;
    gap: 0.889rem;
    font-size: 0.78rem;
    text-decoration: underline;

    span {
      cursor: pointer;
    }
  }
</style>
