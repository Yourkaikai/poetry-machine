import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

const PoemVendingMachine = () => {
  const [keyword, setKeyword] = useState('');
  const [poem, setPoem] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayedPoem, setDisplayedPoem] = useState('');
  const [ambientColor, setAmbientColor] = useState('#f8f9ff');

  // Simulated poetry generation
  const generatePoem = async () => {
    setIsGenerating(true);
    setPoem('');
    setDisplayedPoem('');
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Sample generated poem
    const generatedPoem = `在${keyword}的光芒里
我看见时光的碎片
如同星辰坠落
在记忆的河流中
泛起涟漪

这一刻
永恒与瞬间交织
在诗与梦的边界`;
    
    setPoem(generatedPoem);
    setIsGenerating(false);
  };

  // Typewriter effect for poem display
  useEffect(() => {
    if (poem && !isGenerating) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= poem.length) {
          setDisplayedPoem(poem.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [poem, isGenerating]);

  // Ambient color animation
  useEffect(() => {
    if (isGenerating) {
      const colors = ['#f8f9ff', '#fff8f5', '#fff8fa'];
      let colorIndex = 0;
      
      const interval = setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        setAmbientColor(colors[colorIndex]);
      }, 1000);
      
      return () => clearInterval(interval);
    } else {
      setAmbientColor('#f8f9ff');
    }
  }, [isGenerating]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8 flex items-center justify-center">
      <Card className="w-[32rem] min-h-[24rem] p-8" 
            style={{ backgroundColor: ambientColor, transition: 'background-color 1s' }}>
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-800">
              AI 诗歌自动贩卖机
            </h2>
            <p className="text-gray-500">输入关键词，获取独特的诗歌体验</p>
          </div>
          
          <div className="space-y-4">
            <Input
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="请输入关键词..."
              className="w-full text-lg py-6 px-4 border-gray-200 focus:border-blue-300"
              disabled={isGenerating}
            />
            
            <Button 
              onClick={generatePoem}
              disabled={!keyword || isGenerating}
              className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>正在创作...</span>
                </div>
              ) : '生成诗歌'}
            </Button>
          </div>

          {displayedPoem && (
            <div className="relative">
              <div className="absolute inset-0 bg-white opacity-50 rounded-lg" />
              <div className="relative p-6 rounded-lg">
                <pre className="whitespace-pre-line text-lg leading-relaxed text-center font-serif">
                  {displayedPoem}
                </pre>
                <div className="text-right text-sm text-gray-400 mt-4">
                  {new Date().toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PoemVendingMachine;