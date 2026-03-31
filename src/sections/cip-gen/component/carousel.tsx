import React, { useRef, useState, useEffect } from 'react';

import { Box, Paper, IconButton } from '@mui/material';

type CarouselProps = {
  children: React.ReactNode;
};

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;

    if (!el) return;

    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    // eslint-disable-next-line consistent-return
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [children]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const scrollAmount = 350;

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <Box position="relative" width="100%">
      {/* LEFT BUTTON */}
      {showLeft && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            borderRadius: '50%',
          }}
        >
          <IconButton onClick={() => scroll('left')}>left</IconButton>
        </Paper>
      )}

      {/* SCROLL AREA */}
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          px: 6,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        {children}
      </Box>

      {/* RIGHT BUTTON */}
      {showRight && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            borderRadius: '50%',
          }}
        >
          <IconButton onClick={() => scroll('right')}>right</IconButton>
        </Paper>
      )}
    </Box>
  );
};

export default Carousel;
