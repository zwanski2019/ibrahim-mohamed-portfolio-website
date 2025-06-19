
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { useIMEIChecker } from '@/hooks/useIMEIChecker';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

const IMEIChecker = () => {
  const [imei, setImei] = useState('');
  const { checkIMEI, isLoading, result, error, reset } = useIMEIChecker();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imei.trim()) {
      toast({
        title: t("imei.error"),
        description: t("imei.errorEnterImei"),
        variant: "destructive"
      });
      return;
    }

    // Basic IMEI validation (should be 15 digits)
    const cleanImei = imei.replace(/\s+/g, '');
    if (!/^\d{15}$/.test(cleanImei)) {
      toast({
        title: t("imei.errorInvalidImeiDesc"),
        description: t("imei.errorInvalidImei"),
        variant: "destructive"
      });
      return;
    }

    await checkIMEI(cleanImei);
  };

  const handleReset = () => {
    setImei('');
    reset();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center p-4 sm:p-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          <CardTitle className="text-lg sm:text-2xl">{t("imei.title")}</CardTitle>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          {t("imei.subtitle")}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="imei" className="block text-sm font-medium mb-2">
              {t("imei.enterImei")}
            </label>
            <Input
              id="imei"
              type="text"
              placeholder={t("imei.placeholder")}
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              maxLength={17} // Allow for spaces
              className="text-center text-base sm:text-lg font-mono min-h-[44px]"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {t("imei.findImei")}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="flex-1 min-h-[44px] text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <Search className="mr-2 h-4 w-4 animate-spin" />
                  {t("imei.checking")}
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  {t("imei.checkImei")}
                </>
              )}
            </Button>
            
            {(result || error) && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset}
                className="sm:flex-shrink-0 min-h-[44px] text-sm sm:text-base"
              >
                {t("imei.reset")}
              </Button>
            )}
          </div>
        </form>

        {/* Results */}
        {error && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">{t("imei.error")}</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">{t("imei.results")}</span>
              </div>
              <div className="whitespace-pre-wrap text-xs sm:text-sm font-mono bg-background p-3 sm:p-4 rounded border overflow-x-auto">
                {result}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        <Card className="bg-muted/50">
          <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
            <h3 className="font-medium mb-2 text-sm sm:text-base">{t("imei.whatIsImei")}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("imei.imeiDescription")}
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <div className="text-center p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl mb-2">🔒</div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("imei.features.secure")}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("imei.features.secureDesc")}
            </p>
          </div>
          <div className="text-center p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl mb-2">⚡</div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("imei.features.instant")}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("imei.features.instantDesc")}
            </p>
          </div>
          <div className="text-center p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl mb-2">💯</div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("imei.features.free")}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("imei.features.freeDesc")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IMEIChecker;
